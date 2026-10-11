export const WEB3FORMS_ACCESS_KEY = '95eec0fa-47e5-40ad-a3ad-2f43a7a380da';
const ENDPOINT = 'https://api.web3forms.com/submit';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpV2eRM-5cuBROfbiYLSkgzgkoaT1s8tv2hFq10BF7OAR9W5TAby3mvU_admMu18bI/exec';

export interface ApplicationRecord { name: string; email: string; phone: string; role: string; source: string }

async function postForm(body: BodyInit, headers: HeadersInit): Promise<Response> {
  const response: Response = await fetch(ENDPOINT, { method: 'POST', headers, body, signal: AbortSignal.timeout(20000) });
  // Only retry an explicitly rejected request; uncertain POST outcomes can duplicate enquiries.
  if (response.status === 429) {
    console.warn('Form submission rate limited; retrying once', { endpoint: ENDPOINT, status: response.status });
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    return fetch(ENDPOINT, { method: 'POST', headers, body, signal: AbortSignal.timeout(20000) });
  }
  return response;
}

export async function submitEnquiry(fields: Readonly<Record<string, string>>, attachment: File | null): Promise<void> {
  let body: BodyInit;
  let headers: HeadersInit;
  if (attachment) {
    const data: FormData = new FormData();
    Object.entries(fields).forEach(([key, value]: [string, string]): void => data.append(key, value));
    data.append('access_key', WEB3FORMS_ACCESS_KEY);
    data.append('attachment', attachment);
    body = data;
    headers = {};
  } else {
    body = JSON.stringify({ ...fields, access_key: WEB3FORMS_ACCESS_KEY });
    headers = { 'Content-Type': 'application/json' };
  }
  const response: Response = await postForm(body, headers);
  const result: unknown = await response.json();
  const message: string = typeof result === 'object' && result !== null && 'message' in result && typeof result.message === 'string' ? result.message : 'The form provider returned an unexpected response.';
  const accepted: boolean = typeof result === 'object' && result !== null && 'success' in result && result.success === true;
  if (!response.ok || !accepted) {
    throw new Error(`Form delivery failed (HTTP ${response.status}): ${message}`);
  }
}

export async function recordApplication(record: ApplicationRecord): Promise<void> {
  const response: Response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Application tracking returned HTTP ${response.status}. Email delivery has already succeeded.`);
}

export function formText(data: FormData, name: string): string {
  const value: FormDataEntryValue | null = data.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

export function submissionError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Delivery could not be confirmed. Please contact info@wingssecurity.ie before resubmitting.';
}
