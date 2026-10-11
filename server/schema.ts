import { z } from 'zod';
import { enquiryTypes, publicPaths } from '../src/data/site.js';

const text = (maximum: number): z.ZodString => z.string().trim().max(maximum);
const common = {
  requestId: z.string().uuid(),
  token: z.string().min(8).max(2048),
  sourcePage: text(200).refine((value: string): boolean => publicPaths.includes(value)),
  consent: z.literal(true),
  website: z.literal(''),
};
const cv = z.object({ name: text(120).regex(/\.pdf$/i), content: z.string().max(4194304).regex(/^[A-Za-z0-9+/]+={0,2}$/) }).strict();
export const formSchema = z.discriminatedUnion('kind', [
  z.object({ ...common, kind: z.literal('sales'), data: z.object({
    name: text(120).min(1), email: text(254).email(), phone: text(40), company: text(180),
    service: text(100).refine((value: string): boolean => enquiryTypes.includes(value)),
    sector: text(120), location: text(200), startDate: text(10).regex(/^(\d{4}-\d{2}-\d{2})?$/), message: text(5000).min(10),
  }).strict() }).strict(),
  z.object({ ...common, kind: z.literal('careers'), data: z.object({
    name: text(120).min(1), email: text(254).email(), phone: text(40).min(1), county: text(100).min(1),
    role: z.enum(['Static Security Guard', 'Event Security Guard', 'Reception Security', 'Other']), cv: cv.nullable(),
  }).strict() }).strict(),
]);
export type FormSubmission = z.infer<typeof formSchema>;
export type FormKind = FormSubmission['kind'];
export interface Receipt { leadId: string; notification: 'sent' | 'pending'; cvStored: boolean }

export function validatePdf(content: string): Buffer {
  const bytes: Buffer = Buffer.from(content, 'base64');
  if (bytes.length < 8 || bytes.length > 3 * 1024 * 1024 || bytes.subarray(0, 5).toString('ascii') !== '%PDF-' || bytes.toString('base64') !== content) {
    throw new Error('CV_INVALID');
  }
  return bytes;
}
