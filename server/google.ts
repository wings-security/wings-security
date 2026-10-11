import { createHmac, randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { FormsConfig } from './config.js';
import { requestJson, ServiceError } from './transport.js';

const responseSchema = z.object({ ok: z.boolean(), code: z.string().optional(), data: z.unknown().optional() });
export interface GoogleCommand { operation: string; [key: string]: unknown }
export async function googleCommand(config: FormsConfig, command: GoogleCommand): Promise<unknown> {
  const timestamp: number = Date.now();
  const payload: string = JSON.stringify({ ...command, nonce: randomUUID() });
  const signature: string = createHmac('sha256', config.GOOGLE_FORMS_HELPER_SECRET).update(payload + '\n' + timestamp).digest('base64');
  const response = responseSchema.parse(await requestJson(config.GOOGLE_FORMS_HELPER_URL, {
    method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ payload, timestamp, signature }),
  }, 'Google coordinator'));
  if (!response.ok) throw new ServiceError('Google coordinator', response.code === 'RATE_LIMIT' ? 429 : response.code === 'CONFLICT' ? 409 : 503, response.code || 'SAVE_NOT_CONFIRMED');
  return response.data;
}
