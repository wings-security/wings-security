type LeadKind = 'sales' | 'careers';
interface SaveData { name: string; email: string; phone: string; company?: string; service?: string; role?: string; sector?: string; county?: string; location?: string; startDate?: string; message?: string }
interface Command { operation: string; kind?: LeadKind; requestId?: string; fingerprint?: string; identity?: string; data?: SaveData; cvContent?: string | null; cvDigest?: string; sourcePage?: string; privacyVersion?: string; leadId?: string; leaseId?: string; emailId?: string }
interface RowEntry { row: number; values: string[] }
interface HelperResult { ok: boolean; code?: string; data?: object }
interface GooglePostEvent { postData?: { contents: string } }
interface Reservation { key: string; row: number; id: string; requestId: string; fingerprint: string; created: string; expires: string; cvFile: string }

const HEADERS: readonly string[] = ['Lead ID', 'Request ID', 'Fingerprint', 'Created UTC', 'Delete after UTC', 'Kind', 'Name', 'Email', 'Phone', 'Company', 'Service / role', 'Sector / county', 'Location', 'Start date', 'Message', 'Source page', 'Consent UTC / policy', 'Assigned staff', 'Status', 'Follow-up UTC', 'Follow-up notes', 'CV file ID', 'CV state', 'Notification state', 'Attempts', 'First attempt UTC', 'Next attempt UTC', 'Lease ID', 'Lease expires UTC', 'Email ID', 'Last error', 'Rate identity', 'CV digest'];
const COLUMN = { id: 0, request: 1, fingerprint: 2, created: 3, expires: 4, kind: 5, service: 10, status: 18, cvFile: 21, cvState: 22, notification: 23, attempts: 24, firstAttempt: 25, nextAttempt: 26, lease: 27, leaseExpires: 28, emailId: 29, error: 30, identity: 31, cvDigest: 32 } as const;

function property(name: string): string {
  const value: string | null = PropertiesService.getScriptProperties().getProperty(name);
  if (!value) throw new Error('CONFIGURATION_MISSING');
  return value;
}
function sheetId(kind: LeadKind): string {
  if (property('SALES_SHEET_ID') === property('CAREERS_SHEET_ID')) throw new Error('TRACKER_SEPARATION_REQUIRED');
  return property(kind === 'sales' ? 'SALES_SHEET_ID' : 'CAREERS_SHEET_ID');
}
function entries(kind: LeadKind): RowEntry[] {
  privateResource(sheetId(kind));
  const rows = Sheets.Spreadsheets.Values.get(sheetId(kind), 'Leads!A2:AG').values || [];
  return rows.map((row, index: number): RowEntry => ({ row: index + 2, values: HEADERS.map((_, column: number): string => String(row[column] ?? '')) })).filter((entry: RowEntry): boolean => entry.values[0] !== '');
}
function writeRow(kind: LeadKind, entry: RowEntry): void {
  // Never overwrite staff assignment, status or follow-up edits during a system update.
  Sheets.Spreadsheets.Values.update({ values: [entry.values.slice(21)] }, sheetId(kind), `Leads!V${entry.row}:AG${entry.row}`, { valueInputOption: 'RAW' });
}
function privateResource(id: string): void {
  const permissions = Drive.Permissions.list(id, { supportsAllDrives: true, fields: 'permissions(type)' }).permissions || [];
  if (!permissions.length || permissions.some((permission): boolean => permission.type === 'anyone' || permission.type === 'domain')) throw new Error('SHARING_TOO_BROAD');
}
function expiresAt(kind: LeadKind, created: Date): string {
  const months: number = Number(property(kind === 'sales' ? 'SALES_RETENTION_MONTHS' : 'CAREERS_RETENTION_MONTHS'));
  if (!Number.isInteger(months) || months < 1 || months > 24) throw new Error('RETENTION_INVALID');
  const expires: Date = new Date(created.getTime());
  expires.setUTCDate(1);
  expires.setUTCMonth(expires.getUTCMonth() + months);
  const lastDay: number = new Date(Date.UTC(expires.getUTCFullYear(), expires.getUTCMonth() + 1, 0)).getUTCDate();
  expires.setUTCDate(Math.min(created.getUTCDate(), lastDay));
  return expires.toISOString();
}
function fileNotFound(error: unknown): boolean { return error instanceof Error && /File not found|notFound|404/.test(error.message); }
function createCv(entry: RowEntry, content: string): void {
  const folder: string = property('RECRUITMENT_FOLDER_ID');
  privateResource(folder);
  if (Drive.Files.get(folder, { supportsAllDrives: true, fields: 'mimeType' }).mimeType !== 'application/vnd.google-apps.folder') throw new Error('RECRUITMENT_FOLDER_INVALID');
  const bytes: number[] = Utilities.base64Decode(content);
  if (bytes.length < 8 || bytes.length > 3145728 || String.fromCharCode(...bytes.slice(0, 5)) !== '%PDF-') throw new Error('CV_INVALID');
  try { Drive.Files.get(entry.values[COLUMN.cvFile], { supportsAllDrives: true, fields: 'id' }); return; }
  catch (error: unknown) { if (!fileNotFound(error)) throw error; }
  Drive.Files.create({ id: entry.values[COLUMN.cvFile], name: entry.values[COLUMN.id] + '.pdf', mimeType: 'application/pdf', parents: [folder] },
    Utilities.newBlob(bytes, 'application/pdf', entry.values[COLUMN.id] + '.pdf'), { supportsAllDrives: true, fields: 'id' });
}
function reserveRow(command: Command, rows: readonly RowEntry[]): Reservation {
  if (!command.kind || !command.requestId || !command.fingerprint) throw new Error('COMMAND_INVALID');
  const properties = PropertiesService.getScriptProperties();
  const prefix: string = 'PENDING_' + command.kind + '_';
  const reservations: Reservation[] = Object.entries(properties.getProperties()).filter(([key]): boolean => key.startsWith(prefix)).map(([key, value]): Reservation => ({ ...JSON.parse(value) as Reservation, key }));
  const previous: Reservation | undefined = reservations.find((item: Reservation): boolean => item.requestId === command.requestId || item.fingerprint === command.fingerprint);
  if (previous) {
    if (previous.fingerprint !== command.fingerprint) throw new Error('CONFLICT');
    return previous;
  }
  const counterKey: string = 'NEXT_ROW_' + command.kind;
  const row: number = Math.max(2, Number(properties.getProperty(counterKey)) || 2, ...rows.map((entry: RowEntry): number => entry.row + 1));
  const created: Date = new Date();
  const reservation: Reservation = { key: prefix + command.requestId, row, id: Utilities.getUuid(), requestId: command.requestId, fingerprint: command.fingerprint, created: created.toISOString(), expires: expiresAt(command.kind, created),
    cvFile: command.cvContent ? Drive.Files.generateIds({ count: 1, space: 'drive' }).ids?.[0] || '' : '' };
  if (command.cvContent && !reservation.cvFile) throw new Error('CV_ID_UNAVAILABLE');
  // Persist the row reservation before any uncertain Sheets write; never use blind append retries.
  properties.setProperty(counterKey, String(row + 1));
  properties.setProperty(reservation.key, JSON.stringify(reservation));
  return reservation;
}
function ensureRowCapacity(kind: LeadKind, row: number): void {
  const tab = Sheets.Spreadsheets.get(sheetId(kind), { fields: 'sheets.properties' }).sheets?.find((item): boolean => item.properties?.title === 'Leads')?.properties;
  if (tab?.sheetId === undefined) throw new Error('TRACKER_NOT_INITIALISED');
  if (row > 250000) throw new Error('TRACKER_CAPACITY_REACHED');
  if ((tab.gridProperties?.rowCount || 0) < row) Sheets.Spreadsheets.batchUpdate({ requests: [{ updateSheetProperties: { properties: { sheetId: tab.sheetId, gridProperties: { rowCount: Math.ceil(row / 1000) * 1000, columnCount: HEADERS.length } }, fields: 'gridProperties.rowCount,gridProperties.columnCount' } }] }, sheetId(kind));
}
function saveLead(command: Command): HelperResult {
  if (!command.kind || !command.requestId || !command.fingerprint || !command.identity || !command.data || !command.sourcePage || !command.privacyVersion) throw new Error('COMMAND_INVALID');
  const kind: LeadKind = command.kind;
  const rows: RowEntry[] = entries(kind);
  const existingRequest: RowEntry | undefined = rows.find((entry: RowEntry): boolean => entry.values[COLUMN.request] === command.requestId);
  if (existingRequest && existingRequest.values[COLUMN.fingerprint] !== command.fingerprint) return { ok: false, code: 'CONFLICT' };
  const existing: RowEntry | undefined = existingRequest || rows.find((entry: RowEntry): boolean => entry.values[COLUMN.fingerprint] === command.fingerprint && Date.parse(entry.values[COLUMN.created]) > Date.now() - 600000);
  const now: Date = new Date();
  if (!existing && rows.filter((entry: RowEntry): boolean => entry.values[COLUMN.identity] === command.identity && Date.parse(entry.values[COLUMN.created]) > now.getTime() - 3600000).length >= 3) return { ok: false, code: 'RATE_LIMIT' };
  let record: RowEntry;
  if (existing) {
    record = existing;
    PropertiesService.getScriptProperties().deleteProperty('PENDING_' + kind + '_' + record.values[COLUMN.request]);
  }
  else {
    privateResource(sheetId(kind));
    const data: SaveData = command.data;
    const reservation: Reservation = reserveRow(command, rows);
    ensureRowCapacity(kind, reservation.row);
    const fileId: string = reservation.cvFile;
    const values: string[] = [reservation.id, reservation.requestId, command.fingerprint, reservation.created, reservation.expires, kind,
      data.name, data.email, data.phone, data.company || '', data.service || data.role || '', data.sector || data.county || '', data.location || '', data.startDate || '', data.message || '', command.sourcePage,
      reservation.created + ' / ' + command.privacyVersion, '', 'New', '', '', fileId, fileId ? 'Pending' : 'None', 'Pending', '0', '', reservation.created, '', '', '', '', command.identity, command.cvDigest || ''];
    Sheets.Spreadsheets.Values.update({ values: [values] }, sheetId(kind), `Leads!A${reservation.row}:AG${reservation.row}`, { valueInputOption: 'RAW' });
    const saved: RowEntry | undefined = entries(kind).find((entry: RowEntry): boolean => entry.values[COLUMN.request] === reservation.requestId);
    if (!saved) throw new Error('SAVE_NOT_CONFIRMED');
    record = saved;
    PropertiesService.getScriptProperties().deleteProperty(reservation.key);
  }
  if (record.values[COLUMN.cvState] === 'Pending' && command.cvContent) {
    createCv(record, command.cvContent);
    record = { ...record, values: record.values.map((value: string, column: number): string => column === COLUMN.cvState ? 'Ready' : value) };
    writeRow(kind, record);
  }
  return { ok: true, data: { leadId: record.values[COLUMN.id], cvStored: record.values[COLUMN.cvState] === 'Ready' } };
}
function findLead(command: Command): RowEntry {
  if (!command.kind || !command.leadId) throw new Error('COMMAND_INVALID');
  const entry: RowEntry | undefined = entries(command.kind).find((item: RowEntry): boolean => item.values[COLUMN.id] === command.leadId);
  if (!entry) throw new Error('LEAD_NOT_FOUND');
  return entry;
}
function claimNotification(command: Command): HelperResult {
  if (!command.kind || !command.leaseId) throw new Error('COMMAND_INVALID');
  const entry: RowEntry = findLead(command);
  const values: string[] = entry.values;
  const now: number = Date.now();
  if (values[COLUMN.notification] === 'Sent' || values[COLUMN.notification] === 'Review' || values[COLUMN.cvState] === 'Pending') return { ok: true, data: { claimed: false, sent: values[COLUMN.notification] === 'Sent' } };
  if (values[COLUMN.firstAttempt] && now - Date.parse(values[COLUMN.firstAttempt]) >= 23 * 3600000) {
    writeRow(command.kind, { ...entry, values: values.map((value: string, column: number): string => column === COLUMN.notification ? 'Review' : value) });
    return { ok: true, data: { claimed: false } };
  }
  if (Date.parse(values[COLUMN.leaseExpires]) > now && values[COLUMN.lease] !== command.leaseId || Date.parse(values[COLUMN.nextAttempt]) > now && values[COLUMN.lease] !== command.leaseId) return { ok: true, data: { claimed: false } };
  const changes: { [column: number]: string } = { [COLUMN.notification]: 'Sending', [COLUMN.lease]: command.leaseId, [COLUMN.leaseExpires]: new Date(now + 120000).toISOString(),
    [COLUMN.attempts]: String(Number(values[COLUMN.attempts]) + 1), [COLUMN.firstAttempt]: values[COLUMN.firstAttempt] || new Date(now).toISOString(), [COLUMN.nextAttempt]: new Date(now + 300000).toISOString() };
  writeRow(command.kind, { ...entry, values: values.map((value: string, column: number): string => changes[column] ?? value) });
  return { ok: true, data: { claimed: true, leadId: values[COLUMN.id], kind: command.kind, service: values[COLUMN.service], trackerUrl: 'https://docs.google.com/spreadsheets/d/' + sheetId(command.kind) } };
}
function finishNotification(command: Command): HelperResult {
  if (!command.kind || !command.leaseId || !command.emailId) throw new Error('COMMAND_INVALID');
  const entry: RowEntry = findLead(command);
  if (entry.values[COLUMN.notification] === 'Sent' && entry.values[COLUMN.emailId] === command.emailId) return { ok: true, data: { saved: true } };
  if (entry.values[COLUMN.lease] !== command.leaseId) return { ok: false, code: 'CONFLICT' };
  const changes: { [column: number]: string } = { [COLUMN.notification]: 'Sent', [COLUMN.emailId]: command.emailId, [COLUMN.lease]: '', [COLUMN.leaseExpires]: '', [COLUMN.error]: '' };
  writeRow(command.kind, { ...entry, values: entry.values.map((value: string, column: number): string => changes[column] ?? value) });
  return { ok: true, data: { saved: true } };
}
function pendingNotifications(): HelperResult {
  const items: { kind: LeadKind; leadId: string }[] = (['sales', 'careers'] as const).flatMap((kind: LeadKind) => entries(kind)
    .filter((entry: RowEntry): boolean => entry.values[COLUMN.notification] !== 'Sent' && entry.values[COLUMN.notification] !== 'Review' && entry.values[COLUMN.cvState] !== 'Pending' && !(Date.parse(entry.values[COLUMN.nextAttempt]) > Date.now()) && !(Date.parse(entry.values[COLUMN.leaseExpires]) > Date.now()))
    .map((entry: RowEntry) => ({ kind, leadId: entry.values[COLUMN.id] })));
  return { ok: true, data: { items: items.slice(0, 3) } };
}
function purgeExpired(): HelperResult {
  let deleted: number = 0;
  for (const kind of ['sales', 'careers'] as const) {
    privateResource(sheetId(kind));
    const properties = PropertiesService.getScriptProperties();
    const saved: readonly RowEntry[] = entries(kind);
    for (const [key, value] of Object.entries(properties.getProperties())) {
      if (!key.startsWith('PENDING_' + kind + '_')) continue;
      const reservation: Reservation = JSON.parse(value) as Reservation;
      if (saved.some((entry: RowEntry): boolean => entry.values[COLUMN.id] === reservation.id) || Date.parse(reservation.created) < Date.now() - 172800000) {
        // Never reuse a reserved address, even when an abandoned reservation is cleared.
        properties.deleteProperty(key);
      }
    }
    const expired = entries(kind).filter((entry: RowEntry): boolean => Date.parse(entry.values[COLUMN.expires]) <= Date.now() && entry.values[COLUMN.status] !== 'Retention hold').slice(0, 20).reverse();
    for (const entry of expired) {
      if (entry.values[COLUMN.cvFile]) {
        try { Drive.Files.remove(entry.values[COLUMN.cvFile], { supportsAllDrives: true }); }
        catch (error: unknown) { if (!fileNotFound(error)) throw error; }
      }
      // Preserve reserved row addresses. Removing rows could shift an in-flight write onto another lead.
      Sheets.Spreadsheets.Values.clear({}, sheetId(kind), `Leads!A${entry.row}:AG${entry.row}`);
      deleted += 1;
    }
  }
  return { ok: true, data: { deleted } };
}
function dispatch(command: Command): HelperResult {
  if (command.operation === 'save') return saveLead(command);
  if (command.operation === 'claim') return claimNotification(command);
  if (command.operation === 'finish') return finishNotification(command);
  if (command.operation === 'queued') return pendingNotifications();
  if (command.operation === 'retention') return purgeExpired();
  throw new Error('OPERATION_REJECTED');
}
function authenticate(contents: string): Command {
  if (contents.length > 4350000) throw new Error('REQUEST_TOO_LARGE');
  const envelope = JSON.parse(contents) as { payload: string; timestamp: number; signature: string };
  if (typeof envelope.payload !== 'string' || typeof envelope.timestamp !== 'number' || typeof envelope.signature !== 'string' || Math.abs(Date.now() - envelope.timestamp) > 300000) throw new Error('ACCESS_DENIED');
  const expected: string = Utilities.base64Encode(Utilities.computeHmacSha256Signature(envelope.payload + '\n' + envelope.timestamp, property('HELPER_SECRET')));
  let mismatch: number = expected.length ^ envelope.signature.length;
  for (let index: number = 0; index < expected.length; index += 1) mismatch |= expected.charCodeAt(index) ^ (envelope.signature.charCodeAt(index) || 0);
  if (mismatch !== 0) throw new Error('ACCESS_DENIED');
  const command = JSON.parse(envelope.payload) as Command;
  if (command.kind !== undefined && command.kind !== 'sales' && command.kind !== 'careers') throw new Error('COMMAND_INVALID');
  return command;
}
function doPost(event: GooglePostEvent): object {
  let result: HelperResult;
  try {
    const command: Command = authenticate(event.postData?.contents || '');
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) result = { ok: false, code: 'BUSY' };
    else {
      try { result = dispatch(command); }
      finally { lock.releaseLock(); }
    }
  } catch (error: unknown) {
    const safeCodes: readonly string[] = ['ACCESS_DENIED', 'COMMAND_INVALID', 'CV_INVALID', 'SHARING_TOO_BROAD', 'CONFLICT'];
    const code: string = error instanceof Error && safeCodes.includes(error.message) ? error.message : 'TEMPORARY_FAILURE';
    console.error('Google form helper failed', { code });
    result = { ok: false, code };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
function setupFormTrackers(): void {
  for (const kind of ['sales', 'careers'] as const) {
    privateResource(sheetId(kind));
    const spreadsheet = Sheets.Spreadsheets.get(sheetId(kind), { fields: 'sheets.properties' });
    const existing = spreadsheet.sheets?.find((sheet): boolean => sheet.properties?.title === 'Leads');
    if (!existing) Sheets.Spreadsheets.batchUpdate({ requests: [{ addSheet: { properties: { title: 'Leads', gridProperties: { rowCount: 1000, columnCount: HEADERS.length } } } }] }, sheetId(kind));
    if (existing?.properties?.sheetId !== undefined && (existing.properties.gridProperties?.columnCount || 0) < HEADERS.length) Sheets.Spreadsheets.batchUpdate({ requests: [{ updateSheetProperties: { properties: { sheetId: existing.properties.sheetId, gridProperties: { columnCount: HEADERS.length } }, fields: 'gridProperties.columnCount' } }] }, sheetId(kind));
    if ((Sheets.Spreadsheets.Values.get(sheetId(kind), 'Leads!A1:AG1').values || []).length) throw new Error('TRACKER_ALREADY_INITIALISED');
    Sheets.Spreadsheets.Values.update({ values: [[...HEADERS]] }, sheetId(kind), 'Leads!A1:AG1', { valueInputOption: 'RAW' });
    const id = Sheets.Spreadsheets.get(sheetId(kind), { fields: 'sheets.properties' }).sheets?.find((sheet): boolean => sheet.properties?.title === 'Leads')?.properties?.sheetId;
    if (id === undefined) throw new Error('SHEET_NOT_INITIALISED');
    Sheets.Spreadsheets.batchUpdate({ requests: [
      { updateSheetProperties: { properties: { sheetId: id, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
      { addProtectedRange: { protectedRange: { range: { sheetId: id }, description: 'System-managed enquiry records; only staff workflow columns are editable', warningOnly: false,
        unprotectedRanges: [{ sheetId: id, startRowIndex: 1, startColumnIndex: 17, endColumnIndex: 21 }] } } },
    ] }, sheetId(kind));
  }
  privateResource(property('RECRUITMENT_FOLDER_ID'));
}
