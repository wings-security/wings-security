interface GoogleRowResponse { values?: (string | number | boolean | null)[][] }
interface GoogleFile { id?: string; ids?: string[]; mimeType?: string }
declare const Sheets: { Spreadsheets: {
  Values: { get(id: string, range: string): GoogleRowResponse; clear(body: object, id: string, range: string): object; update(body: { values: string[][] }, id: string, range: string, options: { valueInputOption: string }): object };
  get(id: string, options: { fields: string }): { sheets?: { properties?: { sheetId?: number; title?: string; gridProperties?: { rowCount?: number; columnCount?: number } } }[] };
  batchUpdate(body: { requests: object[] }, id: string): object;
} };
declare const Drive: { Files: {
  generateIds(options: { count: number; space: string }): GoogleFile;
  create(metadata: { id: string; name: string; mimeType: string; parents: string[] }, blob: object, options: { supportsAllDrives: boolean; fields: string }): GoogleFile;
  get(id: string, options: { supportsAllDrives: boolean; fields: string }): GoogleFile;
  remove(id: string, options: { supportsAllDrives: boolean }): void;
}; Permissions: { list(id: string, options: { supportsAllDrives: boolean; fields: string }): { permissions?: { type?: string }[] } } };
declare const PropertiesService: { getScriptProperties(): { getProperty(name: string): string | null; getProperties(): { [name: string]: string }; setProperty(name: string, value: string): object; deleteProperty(name: string): object } };
declare const Utilities: {
  getUuid(): string; base64Encode(bytes: number[]): string; base64Decode(text: string): number[];
  computeHmacSha256Signature(value: string, key: string): number[];
  newBlob(bytes: number[], contentType: string, name: string): object;
};
declare const LockService: { getScriptLock(): { tryLock(milliseconds: number): boolean; releaseLock(): void } };
declare const ContentService: { createTextOutput(text: string): { setMimeType(type: string): object }; MimeType: { JSON: string } };
