import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createContext, runInContext } from 'node:vm';
import { createHmac, randomUUID } from 'node:crypto';
import { test, mock } from 'node:test';
import { handleFormRequest } from '../server/forms.js';
import maintenance from '../api/form-maintenance.js';

interface Harness {
  books: Map<string, string[][]>; files: Set<string>; emails: Map<string, string>;
  failedEmail: boolean; failedCv: boolean; failedFinish: boolean; failedSaveResponse: boolean; sharedPublicly: boolean; helperCalls: number;
  helper(body: string): unknown;
}
const properties: Readonly<Record<string, string>> = {
  HELPER_SECRET: 'TEST-ONLY-HELPER-SECRET-'.repeat(4), SALES_SHEET_ID: 'sales-tracker', CAREERS_SHEET_ID: 'careers-tracker',
  RECRUITMENT_FOLDER_ID: 'private-recruitment', SALES_RETENTION_MONTHS: '12', CAREERS_RETENTION_MONTHS: '6',
};

async function harness(): Promise<Harness> {
  const state: Harness = { books: new Map([['sales-tracker', []], ['careers-tracker', []]]), files: new Set(), emails: new Map(), failedEmail: false, failedCv: false, failedFinish: false, failedSaveResponse: false, sharedPublicly: false, helperCalls: 0, helper: (): unknown => { throw new Error('Helper not initialised'); } };
  const propertyStore: Map<string, string> = new Map(Object.entries(properties));
  const context = createContext({ Error, Date, console,
    PropertiesService: { getScriptProperties: () => ({ getProperty: (name: string): string | null => propertyStore.get(name) || null,
      getProperties: (): object => Object.fromEntries(propertyStore), setProperty: (name: string, value: string): object => { propertyStore.set(name, value); return {}; }, deleteProperty: (name: string): object => { propertyStore.delete(name); return {}; } }) },
    LockService: { getScriptLock: () => ({ tryLock: (): boolean => true, releaseLock: (): void => {} }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (body: string) => ({ setMimeType: (): { body: string } => ({ body }) }) },
    Utilities: { getUuid: randomUUID, computeHmacSha256Signature: (value: string, key: string): number[] => Array.from(createHmac('sha256', key).update(value).digest()),
      base64Encode: (bytes: number[]): string => Buffer.from(bytes).toString('base64'), base64Decode: (value: string): number[] => Array.from(Buffer.from(value, 'base64')), newBlob: (): object => ({}) },
    Sheets: { Spreadsheets: {
      Values: {
        get: (id: string): { values: string[][] } => ({ values: structuredClone(state.books.get(id) || []) }),
        clear: (_body: object, id: string, range: string): object => { state.books.get(id)![Number(range.match(/\d+/)![0]) - 2] = []; return {}; },
        update: (body: { values: string[][] }, id: string, range: string): object => {
          if (state.failedFinish && body.values[0][2] === 'Sent') throw new Error('Simulated Google write failure');
          const index: number = Number(range.match(/\d+/)![0]) - 2;
          if (range.startsWith('Leads!A')) state.books.get(id)![index] = structuredClone(body.values[0]);
          else state.books.get(id)![index].splice(21, body.values[0].length, ...body.values[0]);
          if (range.startsWith('Leads!A') && state.failedSaveResponse) throw new Error('Simulated lost response after committed write');
          return {};
        },
      },
      get: (): object => ({ sheets: [{ properties: { title: 'Leads', sheetId: 0, gridProperties: { rowCount: 1000, columnCount: 33 } } }] }),
      batchUpdate: (body: { requests: { deleteDimension: { range: { startIndex: number } } }[] }, id: string): object => { state.books.get(id)!.splice(body.requests[0].deleteDimension.range.startIndex - 1, 1); return {}; },
    } },
    Drive: { Permissions: { list: (): object => ({ permissions: [{ type: state.sharedPublicly ? 'anyone' : 'user' }] }) }, Files: {
      generateIds: (): object => ({ ids: ['cv-' + randomUUID()] }),
      get: (id: string): object => { if (id === 'private-recruitment') return { id, mimeType: 'application/vnd.google-apps.folder' }; if (!state.files.has(id)) throw new Error('File not found'); return { id }; },
      create: (file: { id: string }): object => { if (state.failedCv) throw new Error('Simulated Drive failure'); state.files.add(file.id); return { id: file.id }; },
      remove: (id: string): void => { state.files.delete(id); },
    } },
  });
  runInContext(await readFile('.google-script/Code.js', 'utf8'), context);
  state.helper = (body: string): unknown => {
    state.helperCalls += 1;
    context.event = { postData: { contents: body } };
    const result = runInContext('doPost(event)', context) as { body: string };
    return JSON.parse(result.body) as unknown;
  };
  return state;
}
function configure(): void {
  Object.assign(process.env, { VERCEL_ENV: 'preview', SALES_FORM_ENABLED: 'true', CAREERS_FORM_ENABLED: 'true',
    FORMS_ALLOWED_ORIGINS: 'https://wingssecurity.ie', TURNSTILE_ALLOWED_HOSTNAMES: 'wingssecurity.ie', TURNSTILE_SECRET_KEY: 'TEST-ONLY-TURNSTILE-SECRET',
    GOOGLE_FORMS_HELPER_URL: 'https://script.google.com/macros/s/test-only/exec', GOOGLE_FORMS_HELPER_SECRET: properties.HELPER_SECRET,
    RESEND_API_KEY: 'TEST-ONLY-RESEND-KEY', FORMS_FROM_EMAIL: 'forms@wingssecurity.ie', SALES_NOTIFICATION_EMAIL: 'info@wingssecurity.ie',
    CAREERS_NOTIFICATION_EMAIL: 'careers@wingssecurity.ie', FORMS_PRIVACY_VERSION: 'test-policy', CRON_SECRET: 'TEST-ONLY-CRON-SECRET-'.repeat(3) });
}
function intercept(state: Harness): void {
  mock.method(globalThis, 'fetch', async (input: string | URL | Request, options: RequestInit): Promise<Response> => {
    const url: string = String(input);
    const body = JSON.parse(String(options.body)) as Record<string, string>;
    if (url.includes('challenges.cloudflare.com')) return Response.json({ success: body.response.startsWith('pass-'), hostname: 'wingssecurity.ie', action: body.response.endsWith('careers') ? 'careers' : 'sales' });
    if (url.includes('script.google.com')) return Response.json(state.helper(String(options.body)));
    if (url.includes('api.resend.com')) {
      assert.ok([...state.books.values()].some((rows: string[][]): boolean => rows.length > 0), 'Storage must precede email');
      assert.ok(!String(options.body).includes('Person Testing'), 'Email should not copy applicant PII');
      if (state.failedEmail) return Response.json({ name: 'rate_limit_exceeded' }, { status: 429 });
      const key: string = new Headers(options.headers).get('Idempotency-Key')!;
      if (!state.emails.has(key)) state.emails.set(key, randomUUID());
      return Response.json({ id: state.emails.get(key) });
    }
    throw new Error('Unexpected external service: ' + url);
  });
}
function sales(requestId: string): object {
  return { kind: 'sales', requestId, token: 'pass-sales', sourcePage: '/contact', consent: true, website: '', data: {
    name: 'Person Testing', email: 'test@example.com', phone: '', company: '=HYPERLINK("bad")', service: 'Static guarding', sector: '', location: '', startDate: '', message: 'Test enquiry, not a real lead.',
  } };
}
function careers(requestId: string): object {
  return { kind: 'careers', requestId, token: 'pass-careers', sourcePage: '/careers', consent: true, website: '', data: {
    name: 'Person Testing', email: 'applicant@example.com', phone: '0000000', county: 'Dublin', role: 'Other', cv: { name: 'test.pdf', content: Buffer.from('%PDF-1.4\nTest fixture').toString('base64') },
  } };
}
function request(body: object, origin: string): Request { return new Request('https://wingssecurity.ie/api/forms', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) }); }

test('sales are saved once under repeated requests; notification is idempotent and workflow edits survive', async (): Promise<void> => {
  configure(); const state: Harness = await harness(); intercept(state);
  try {
    const id: string = randomUUID();
    const results: Response[] = await Promise.all(Array.from({ length: 6 }, (): Promise<Response> => handleFormRequest(request(sales(id), 'https://wingssecurity.ie'))));
    assert.ok(results.every((result: Response): boolean => result.status === 201));
    assert.equal(state.books.get('sales-tracker')!.length, 1);
    assert.equal(state.emails.size, 1);
    assert.equal(state.books.get('careers-tracker')!.length, 0);
    const row: string[] = state.books.get('sales-tracker')![0]; row[17] = 'Staff member'; row[18] = 'In progress'; row[20] = 'Follow up tomorrow';
    await handleFormRequest(request(sales(id), 'https://wingssecurity.ie'));
    assert.equal(row[17], 'Staff member'); assert.equal(row[20], 'Follow up tomorrow');
    await handleFormRequest(request(sales(randomUUID()), 'https://wingssecurity.ie'));
    assert.equal(state.books.get('sales-tracker')!.length, 1, 'Repeated content within ten minutes should deduplicate even after refresh');
    const changed = { ...sales(id), data: { ...(sales(id) as { data: object }).data, message: 'Changed request details.' } };
    assert.equal((await handleFormRequest(request(changed, 'https://wingssecurity.ie'))).status, 409);
  } finally { mock.restoreAll(); }
});
test('notification failure keeps a persisted lead; authenticated maintenance retries the outbox', async (): Promise<void> => {
  configure(); const state: Harness = await harness(); intercept(state); state.failedEmail = true;
  try {
    const response: Response = await handleFormRequest(request(sales(randomUUID()), 'https://wingssecurity.ie'));
    assert.equal(response.status, 201); assert.equal((await response.json() as { notification: string }).notification, 'pending');
    const row: string[] = state.books.get('sales-tracker')![0]; assert.equal(row[23], 'Sending');
    assert.equal((await maintenance.fetch(new Request('https://wingssecurity.ie/api/form-maintenance'))).status, 403);
    row[26] = ''; row[28] = ''; state.failedEmail = false;
    const retried: Response = await maintenance.fetch(new Request('https://wingssecurity.ie/api/form-maintenance', { headers: { Authorization: 'Bearer ' + process.env.CRON_SECRET } }));
    assert.equal(retried.status, 200); assert.equal(row[23], 'Sent'); assert.equal(state.emails.size, 1);
  } finally { mock.restoreAll(); }
});
test('interrupted PDF upload resumes the same lead and private file without emailing an incomplete application', async (): Promise<void> => {
  configure(); const state: Harness = await harness(); intercept(state); state.failedCv = true;
  try {
    const id: string = randomUUID();
    assert.equal((await handleFormRequest(request(careers(id), 'https://wingssecurity.ie'))).status, 503);
    assert.equal(state.books.get('careers-tracker')!.length, 1); assert.equal(state.emails.size, 0);
    state.failedCv = false;
    assert.equal((await handleFormRequest(request(careers(id), 'https://wingssecurity.ie'))).status, 201);
    assert.equal(state.books.get('careers-tracker')!.length, 1); assert.equal(state.files.size, 1); assert.equal(state.books.get('sales-tracker')!.length, 0);
  } finally { mock.restoreAll(); }
});
test('invalid origin, failed challenge, invalid PDF, broad sharing and rate excess are rejected', async (): Promise<void> => {
  configure(); const state: Harness = await harness(); intercept(state);
  try {
    assert.equal((await handleFormRequest(request(sales(randomUUID()), 'https://evil.example'))).status, 403);
    assert.equal((await handleFormRequest(request({ ...sales(randomUUID()), token: 'invalid-token' }, 'https://wingssecurity.ie'))).status, 403);
    const invalidCv = { ...(careers(randomUUID()) as { data: object }), data: { ...(careers(randomUUID()) as { data: object }).data, cv: { name: 'test.pdf', content: Buffer.from('not a PDF').toString('base64') } } };
    assert.equal((await handleFormRequest(request(invalidCv, 'https://wingssecurity.ie'))).status, 400);
    state.sharedPublicly = true;
    assert.equal((await handleFormRequest(request(sales(randomUUID()), 'https://wingssecurity.ie'))).status, 503);
    state.sharedPublicly = false;
    for (let index: number = 0; index < 3; index += 1) assert.equal((await handleFormRequest(request({ ...sales(randomUUID()), data: { ...(sales(randomUUID()) as { data: object }).data, message: 'Different enquiry number ' + index } }, 'https://wingssecurity.ie'))).status, 201);
    assert.equal((await handleFormRequest(request({ ...sales(randomUUID()), data: { ...(sales(randomUUID()) as { data: object }).data, message: 'Fourth unique enquiry, rate limited.' } }, 'https://wingssecurity.ie'))).status, 429);
    assert.equal(state.books.get('sales-tracker')!.length, 3);
    assert.deepEqual(state.helper(JSON.stringify({ payload: '{}', timestamp: Date.now(), signature: 'forged' })), { ok: false, code: 'ACCESS_DENIED' });
  } finally { mock.restoreAll(); }
});
test('retention deletes recruitment PDFs and rows, while documented holds remain', async (): Promise<void> => {
  configure(); const state: Harness = await harness(); intercept(state);
  try {
    await handleFormRequest(request(careers(randomUUID()), 'https://wingssecurity.ie'));
    await handleFormRequest(request(sales(randomUUID()), 'https://wingssecurity.ie'));
    state.books.get('careers-tracker')![0][4] = '2020-01-01T00:00:00.000Z';
    state.books.get('sales-tracker')![0][4] = '2020-01-01T00:00:00.000Z'; state.books.get('sales-tracker')![0][18] = 'Retention hold';
    await maintenance.fetch(new Request('https://wingssecurity.ie/api/form-maintenance', { headers: { Authorization: 'Bearer ' + process.env.CRON_SECRET } }));
    assert.equal(state.books.get('careers-tracker')!.filter((row: string[]): boolean => Boolean(row[0])).length, 0); assert.equal(state.files.size, 0); assert.equal(state.books.get('sales-tracker')!.length, 1);
  } finally { mock.restoreAll(); }
});

test('a committed write with a lost response is recovered without appending a second lead', async (): Promise<void> => {
  configure(); const state: Harness = await harness(); intercept(state);
  try {
    const id: string = randomUUID();
    state.failedSaveResponse = true;
    assert.equal((await handleFormRequest(request(sales(id), 'https://wingssecurity.ie'))).status, 503);
    assert.equal(state.books.get('sales-tracker')!.length, 1);
    assert.equal(state.emails.size, 0);
    state.failedSaveResponse = false;
    assert.equal((await handleFormRequest(request(sales(id), 'https://wingssecurity.ie'))).status, 201);
    assert.equal(state.books.get('sales-tracker')!.length, 1);
    assert.equal(state.emails.size, 1);
    process.env.SALES_FORM_ENABLED = 'false';
    process.env.CAREERS_FORM_ENABLED = 'false';
    assert.equal((await maintenance.fetch(new Request('https://wingssecurity.ie/api/form-maintenance', { headers: { Authorization: 'Bearer ' + process.env.CRON_SECRET } }))).status, 200);
  } finally { mock.restoreAll(); }
});
