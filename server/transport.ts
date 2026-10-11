export class ServiceError extends Error {
  constructor(readonly service: string, readonly status: number, readonly code: string) { super(`${service}: HTTP ${status}, ${code}`); }
}
export async function requestJson(url: string, options: RequestInit, service: string): Promise<unknown> {
  for (let attempt: number = 0; attempt < 2; attempt += 1) {
    try {
      const response: Response = await fetch(url, { ...options, signal: AbortSignal.timeout(8000) });
      if (!response.ok) {
        throw new ServiceError(service, response.status, 'HTTP_REJECTED');
      }
      return await response.json() as unknown;
    } catch (error: unknown) {
      const retryable: boolean = !(error instanceof ServiceError) || error.status === 429 || error.status >= 500;
      if (!retryable || attempt === 1) throw error;
      console.warn('External request retry', { service, attempt: attempt + 1, status: error instanceof ServiceError ? error.status : 0 });
      await new Promise<void>((resolve): void => { setTimeout(resolve, 250 * 2 ** attempt); });
    }
  }
  throw new Error('RETRY_LIMIT_EXCEEDED');
}
