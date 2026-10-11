import type { FormKind, FormSubmission, Receipt } from '../../server/schema';

export function usesServerForms(kind: FormKind): boolean {
  const provider: string | undefined = kind === 'sales' ? import.meta.env.VITE_SALES_FORM_PROVIDER : import.meta.env.VITE_CAREERS_FORM_PROVIDER;
  if (provider !== undefined && provider !== 'server' && provider !== 'web3forms') throw new Error('Unknown form provider configuration.');
  return provider === 'server';
}
export async function pdfForSubmission(file: File | null): Promise<{ name: string; content: string } | null> {
  if (!file) return null;
  if (!/\.pdf$/i.test(file.name) || file.size > 3 * 1024 * 1024 || file.size === 0) throw new Error('Choose a PDF CV up to 3 MB.');
  const bytes: Uint8Array = new Uint8Array(await file.arrayBuffer());
  const chunks: string[] = [];
  for (let offset: number = 0; offset < bytes.length; offset += 32768) chunks.push(String.fromCharCode(...bytes.subarray(offset, offset + 32768)));
  return { name: file.name, content: btoa(chunks.join('')) };
}
export async function submitSecureForm(submission: FormSubmission): Promise<Receipt> {
  const response: Response = await fetch('/api/forms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submission), signal: AbortSignal.timeout(100000) });
  const body: unknown = await response.json();
  if (!response.ok) {
    const code: string = typeof body === 'object' && body !== null && 'code' in body && typeof body.code === 'string' ? body.code : 'SAVE_NOT_CONFIRMED';
    throw new Error(code === 'SPAM_CHECK_FAILED' ? 'Please complete a fresh security check and try again.' : code === 'RATE_LIMIT' ? 'Too many submissions. Please wait an hour or contact WINGS directly.' : code === 'CV_INVALID' ? 'Please choose a valid PDF CV up to 3 MB.' : code === 'CONFLICT' ? 'This reference belongs to different details. Contact WINGS before submitting again.' : 'We could not confirm that your details were saved. Keep this page open and retry, or contact WINGS.');
  }
  if (typeof body !== 'object' || body === null || !('leadId' in body) || typeof body.leadId !== 'string' || !('notification' in body) || (body.notification !== 'sent' && body.notification !== 'pending') || !('cvStored' in body) || typeof body.cvStored !== 'boolean') throw new Error('The server returned an unexpected receipt. Contact WINGS before submitting again.');
  return { leadId: body.leadId, notification: body.notification, cvStored: body.cvStored };
}
