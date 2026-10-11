import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { FormsConfig } from './config.js';
import type { FormKind } from './schema.js';
import { googleCommand } from './google.js';
import { requestJson, ServiceError } from './transport.js';

const claimSchema = z.object({ claimed: z.boolean(), sent: z.boolean().optional(), leadId: z.string().optional(), kind: z.enum(['sales', 'careers']).optional(), service: z.string().optional(), trackerUrl: z.string().url().optional() });
const emailSchema = z.object({ id: z.string().min(1) });

export async function notifyLead(config: FormsConfig, kind: FormKind, leadId: string): Promise<boolean> {
  const leaseId: string = randomUUID();
  const claim = claimSchema.parse(await googleCommand(config, { operation: 'claim', kind, leadId, leaseId }));
  if (!claim.claimed) return claim.sent === true;
  if (!claim.leadId || !claim.kind || !claim.trackerUrl || !claim.service) throw new Error('NOTIFICATION_CLAIM_INVALID');
  try {
    const email = emailSchema.parse(await requestJson('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: 'Bearer ' + config.RESEND_API_KEY, 'Content-Type': 'application/json', 'Idempotency-Key': 'wings/' + claim.leadId },
      body: JSON.stringify({ from: config.FORMS_FROM_EMAIL, to: [claim.kind === 'sales' ? config.SALES_NOTIFICATION_EMAIL : config.CAREERS_NOTIFICATION_EMAIL],
        subject: `WINGS ${claim.kind === 'sales' ? 'enquiry' : 'application'} ${claim.leadId}`,
        text: `A new ${claim.kind === 'sales' ? 'commercial enquiry' : 'application'} has been saved.\nReference: ${claim.leadId}\nService / role: ${claim.service}\nReview in the restricted tracker: ${claim.trackerUrl}\nNo CV or personal details are attached to this notification.`,
      }),
    }, 'Resend'));
    await googleCommand(config, { operation: 'finish', kind, leadId, leaseId, result: 'sent', emailId: email.id });
    return true;
  } catch (error: unknown) {
    console.warn('Notification remains queued', { leadId, service: error instanceof ServiceError ? error.service : 'notification', status: error instanceof ServiceError ? error.status : 0 });
    // Do not release a lease after uncertain delivery; the same Resend key is retained for retries.
    throw error;
  }
}
