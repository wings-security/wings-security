import { z } from 'zod';
import type { FormKind } from './schema.js';

const configuration = z.object({
  FORMS_ALLOWED_ORIGINS: z.string().min(1), TURNSTILE_SECRET_KEY: z.string().min(20),
  TURNSTILE_ALLOWED_HOSTNAMES: z.string().min(1), GOOGLE_FORMS_HELPER_URL: z.string().url(),
  GOOGLE_FORMS_HELPER_SECRET: z.string().min(48), RESEND_API_KEY: z.string().min(10),
  FORMS_FROM_EMAIL: z.string().email(), SALES_NOTIFICATION_EMAIL: z.string().email(),
  CAREERS_NOTIFICATION_EMAIL: z.string().email(), FORMS_PRIVACY_VERSION: z.string().min(1).max(50),
});
export type FormsConfig = z.infer<typeof configuration>;

export function readConfig(kind: FormKind): FormsConfig {
  if (process.env[kind === 'sales' ? 'SALES_FORM_ENABLED' : 'CAREERS_FORM_ENABLED'] !== 'true') throw new Error('FORMS_DISABLED');
  return readMaintenanceConfig();
}

export function readMaintenanceConfig(): FormsConfig {
  const parsed = configuration.safeParse(process.env);
  if (!parsed.success) throw new Error('CONFIGURATION_MISSING');
  const config: FormsConfig = parsed.data;
  const helper: URL = new URL(config.GOOGLE_FORMS_HELPER_URL);
  if (helper.protocol !== 'https:' || helper.hostname !== 'script.google.com' || !/^\/macros\/s\/[^/]+\/exec$/.test(helper.pathname)) throw new Error('HELPER_URL_INVALID');
  if (process.env.VERCEL_ENV === 'production') {
    if (process.env.FORMS_EDGE_RATE_LIMIT_CONFIRMED !== 'true') throw new Error('EDGE_RATE_LIMIT_NOT_CONFIRMED');
    if (/^[123]x0+AA$/.test(config.TURNSTILE_SECRET_KEY)) throw new Error('TURNSTILE_TEST_SECRET_FORBIDDEN');
    if (config.FORMS_ALLOWED_ORIGINS.split(',').some((origin: string): boolean => !origin.trim().startsWith('https://'))) throw new Error('PRODUCTION_ORIGIN_INVALID');
    if (config.TURNSTILE_ALLOWED_HOSTNAMES.split(',').some((host: string): boolean => ['localhost', '127.0.0.1', 'dummy-key-pass'].includes(host.trim()))) throw new Error('PRODUCTION_HOSTNAME_INVALID');
  }
  return config;
}
