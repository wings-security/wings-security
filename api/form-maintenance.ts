import { timingSafeEqual } from 'node:crypto';
import { readMaintenanceConfig } from '../server/config.js';
import { googleCommand } from '../server/google.js';
import { notifyLead } from '../server/notifications.js';
import { jsonResponse } from '../server/forms.js';
import { z } from 'zod';

const queuedSchema = z.object({ items: z.array(z.object({ kind: z.enum(['sales', 'careers']), leadId: z.string().uuid() })) });
async function maintenance(request: Request): Promise<Response> {
  const secret: string = process.env.CRON_SECRET || '';
  const supplied: Buffer = Buffer.from(request.headers.get('authorization') || '');
  const expected: Buffer = Buffer.from('Bearer ' + secret);
  if (request.method !== 'GET' || secret.length < 32 || supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return jsonResponse(403, { code: 'ACCESS_DENIED' });
  try {
    const config = readMaintenanceConfig();
    await googleCommand(config, { operation: 'retention' });
    const queued = queuedSchema.parse(await googleCommand(config, { operation: 'queued' }));
    let pending: number = 0;
    for (const item of queued.items.slice(0, 3)) {
      try { if (!await notifyLead(config, item.kind, item.leadId)) pending += 1; }
      catch (error: unknown) { pending += 1; console.warn('Queued notification retry failed', { leadId: item.leadId, error: error instanceof Error ? error.name : 'unknown' }); }
    }
    return jsonResponse(pending > 0 ? 503 : 200, { processed: Math.min(3, queued.items.length), pending });
  } catch (error: unknown) {
    console.error('Form maintenance failed', { error: error instanceof Error ? error.name : 'unknown' });
    return jsonResponse(503, { code: 'MAINTENANCE_FAILED' });
  }
}
export default { fetch: maintenance };
