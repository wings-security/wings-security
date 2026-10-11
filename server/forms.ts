import { createHash, createHmac, randomUUID } from 'node:crypto';
import { z } from 'zod';
import { readConfig } from './config.js';
import type { FormsConfig } from './config.js';
import { formSchema, validatePdf } from './schema.js';
import type { FormSubmission, Receipt } from './schema.js';
import { googleCommand } from './google.js';
import { notifyLead } from './notifications.js';
import { requestJson, ServiceError } from './transport.js';

const verificationSchema = z.object({ success: z.boolean(), hostname: z.string().optional(), action: z.string().optional() });
const savedSchema = z.object({ leadId: z.string().uuid(), cvStored: z.boolean() });
class FormError extends Error { constructor(readonly status: number, readonly code: string) { super(code); } }
export function jsonResponse(status: number, body: object): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
async function readBody(request: Request): Promise<unknown> {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new FormError(415, 'JSON_REQUIRED');
  if (request.headers.get('content-encoding')) throw new FormError(415, 'ENCODING_UNSUPPORTED');
  if (Number(request.headers.get('content-length')) > 4300000) throw new FormError(413, 'REQUEST_TOO_LARGE');
  const reader: ReadableStreamDefaultReader<Uint8Array> | undefined = request.body?.getReader();
  if (!reader) throw new FormError(400, 'BODY_REQUIRED');
  const chunks: Uint8Array[] = [];
  let size: number = 0;
  while (true) {
    const result: ReadableStreamReadResult<Uint8Array> = await reader.read();
    if (result.done) break;
    size += result.value.byteLength;
    if (size > 4300000) { await reader.cancel(); throw new FormError(413, 'REQUEST_TOO_LARGE'); }
    chunks.push(result.value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown; }
  catch { throw new FormError(400, 'INVALID_JSON'); }
}
async function verifyChallenge(config: FormsConfig, submission: FormSubmission): Promise<void> {
  const verification = verificationSchema.parse(await requestJson('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: config.TURNSTILE_SECRET_KEY, response: submission.token, idempotency_key: randomUUID() }),
  }, 'Turnstile'));
  if (!verification.success || verification.action !== submission.kind || !verification.hostname || !config.TURNSTILE_ALLOWED_HOSTNAMES.split(',').map((item: string): string => item.trim()).includes(verification.hostname)) throw new FormError(403, 'SPAM_CHECK_FAILED');
}
async function saveSubmission(config: FormsConfig, submission: FormSubmission): Promise<Receipt> {
  const cvContent: string | null = submission.kind === 'careers' ? submission.data.cv?.content || null : null;
  const cvDigest: string = cvContent ? createHash('sha256').update(validatePdf(cvContent)).digest('hex') : '';
  const data = submission.kind === 'careers' ? { ...submission.data, cv: null } : submission.data;
  const fingerprint: string = createHash('sha256').update(JSON.stringify({ kind: submission.kind, data, sourcePage: submission.sourcePage, cvDigest, privacyVersion: config.FORMS_PRIVACY_VERSION })).digest('hex');
  const identity: string = createHmac('sha256', config.GOOGLE_FORMS_HELPER_SECRET).update(submission.data.email.toLowerCase()).digest('hex');
  const saved = savedSchema.parse(await googleCommand(config, { operation: 'save', kind: submission.kind, requestId: submission.requestId, fingerprint, identity,
    data, cvContent, cvDigest, sourcePage: submission.sourcePage, privacyVersion: config.FORMS_PRIVACY_VERSION,
  }));
  let sent: boolean = false;
  try { sent = await notifyLead(config, submission.kind, saved.leadId); }
  catch (error: unknown) { console.warn('Lead saved; notification pending', { leadId: saved.leadId, status: error instanceof ServiceError ? error.status : 0 }); }
  return { ...saved, notification: sent ? 'sent' : 'pending' };
}
export async function handleFormRequest(request: Request): Promise<Response> {
  if (request.method !== 'POST') return jsonResponse(405, { code: 'METHOD_NOT_ALLOWED' });
  try {
    const submission: FormSubmission = formSchema.parse(await readBody(request));
    const config: FormsConfig = readConfig(submission.kind);
    const origin: string = request.headers.get('origin') || '';
    if (!config.FORMS_ALLOWED_ORIGINS.split(',').map((item: string): string => item.trim()).includes(origin)) throw new FormError(403, 'ORIGIN_REJECTED');
    await verifyChallenge(config, submission);
    return jsonResponse(201, await saveSubmission(config, submission));
  } catch (error: unknown) {
    const code: string = error instanceof FormError ? error.code : error instanceof z.ZodError ? 'INVALID_FIELDS' : error instanceof ServiceError ? error.code : error instanceof Error && error.message === 'CV_INVALID' ? 'CV_INVALID' : 'SAVE_NOT_CONFIRMED';
    const status: number = error instanceof FormError || error instanceof ServiceError ? error.status : code === 'INVALID_FIELDS' || code === 'CV_INVALID' ? 400 : 503;
    console.warn('Form request rejected', { status, code });
    return jsonResponse(status, { code, message: 'Your submission has not been confirmed. Your details are still available; retry with the same reference or contact WINGS.' });
  }
}
