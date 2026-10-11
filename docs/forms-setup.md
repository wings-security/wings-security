# Secure forms: setup and acceptance

## Current state

The secure sales and recruitment paths are implemented but inactive. Web3Forms
remains the default for both forms. No production credentials are committed.
Local integration tests simulate the external providers; they do not prove live
Google, Cloudflare or Resend delivery. Production acceptance is still required.

The browser sends a Turnstile token and submission reference to `/api/forms`.
Vercel verifies the challenge, origin, payload and consent. A signed Google Apps
Script helper uses ScriptLock and the Advanced Sheets API to persist a lead in a
reserved row. Recruitment uses a separate spreadsheet and private Drive folder.
Only after storage succeeds does Resend receive a notification containing the
reference, service and restricted tracker link, not the applicant's details or CV.

No new production dependency or separate database is introduced. Google OAuth
credentials remain inside Google; private helper and email secrets remain in
Vercel. The Turnstile site key is public by design. The existing public Web3Forms
access key remains until the legacy integration is retired after acceptance.

## Account inputs needed

- Vercel project/team and business-appropriate hosting plan, deployment access,
  production domain and permission to configure firewall rules and cron jobs.
- Dedicated Google Workspace automation account; separate blank sales and
  recruitment spreadsheet IDs; private recruitment folder ID; approved staff
  and recruitment-only access list.
- Cloudflare Turnstile widget for the production hostnames, public site key and
  private verification secret.
- Resend account, verified sending domain/subdomain and DNS access; server API
  key; approved sender, sales inbox and restricted recruitment inbox.
- Approval for sales retention of 12 months and recruitment retention of 6
  months, privacy-notice version and responsible staff for follow-ups and alerts.

Enter secrets directly into the service settings, never chat, Git or browser code.
Use different Google projects, storage and secrets for preview and production:
Apps Script properties are shared between deployments of the same project.

## Google Workspace setup

1. Create two private blank spreadsheets and a private recruitment folder using
   the dedicated automation account. Share only with approved named staff/groups.
   No public or whole-domain access. Audit group membership separately.
2. Create an Apps Script project owned by that account. Enable Advanced Google
   Sheets API v4 and Drive API v3 and the corresponding Cloud project APIs.
3. Run `npm run build:forms`. Copy `.google-script/Code.js` and the supplied
   `google-apps-script/appsscript.json` into the project.
4. Set Script Properties: `HELPER_SECRET` (a random secret at least 48 characters),
   `SALES_SHEET_ID`, `CAREERS_SHEET_ID`, `RECRUITMENT_FOLDER_ID`,
   `SALES_RETENTION_MONTHS=12`, `CAREERS_RETENTION_MONTHS=6`.
5. Authorise and run `setupFormTrackers`. It creates the `Leads` tabs, headings,
   frozen header and protected system columns. Existing populated tabs are
   rejected rather than overwritten. Staff edit R:U only: assigned staff, status,
   follow-up date and notes. Use filter views, not physical row sorting, deletion
   or movement: reserved row addresses must remain stable.
6. Deploy a web app executing as the automation owner. Its URL is externally
   reachable, but requests require the private HMAC signature and timestamp.
   Restrict project editors. Put its `/exec` URL and the same helper secret into
   Vercel's server-only environment settings.

The script's Drive scope is broad: keep this dedicated account's accessible
files limited to the trackers and recruitment folder. Review Workspace policy
before authorising it. Never share CV links publicly or attach CVs to emails.

## Vercel, Cloudflare and Resend

Use Node.js 22. Functions are configured for Dublin with a 120-second duration;
confirm these settings against the actual hosting plan. Copy `.env.example`
settings into the correct Vercel environment. Do not prefix secrets with `VITE_`.

Configure Turnstile's production hostname allowlist. Match
`FORMS_ALLOWED_ORIGINS` and `TURNSTILE_ALLOWED_HOSTNAMES` exactly. Production
rejects test secrets and local hostnames. Local Vite alone does not serve Vercel
functions; use a Vercel preview deployment for real integration acceptance.

Configure a Vercel firewall rate-limit rule for POST `/api/forms` (initially ten
requests per minute per IP). Test that it blocks excess requests before setting
`FORMS_EDGE_RATE_LIMIT_CONFIRMED=true`. The Google helper additionally limits new
records to three per normalised email identity per hour. Confirm firewall cost
and plan entitlement before enabling it.

Verify the Resend sender domain and its SPF/DKIM records. Do not replace Google
Workspace MX records. Confirm both destination inboxes and provider quotas.
Free-tier quotas do not guarantee unlimited notifications.

Set a random `CRON_SECRET` of at least 32 characters. After confirming cron plan
support, configure `/api/form-maintenance` every five minutes in Vercel. The job
must send `Authorization: Bearer <CRON_SECRET>`; never put that token in a URL.
Cron is deliberately not enabled before account setup. Monitor failed runs and
review pending records daily. Each run handles up to three notifications and up
to twenty expired records per tracker. Retention and the notification outbox must
continue running even if new submissions are disabled.

## Failure handling and staff workflow

The same submission reference is retained in the browser after an uncertain
failure. Same-reference/different-content requests are rejected. Identical new
requests within ten minutes are deduplicated. Row reservations are persisted
before writes, so retries use the same address, not another append. Abandoned
reservation metadata is cleared after 48 hours without reusing row addresses.

A failed notification does not turn a saved enquiry into a submission failure.
The Sheet holds its notification state and the maintenance job retries it.
Resend keys are stable per lead. Automatic retries stop after 23 hours from the
first email attempt, before the provider's 24-hour idempotency window expires.
Records marked `Review` need manual provider reconciliation before resending.

CVs accept PDF only, maximum 3 MB to fit the function request limit after base64
encoding. Size and PDF-signature checks are not malware scanning. Treat uploaded
files as untrusted and apply recruitment-file safety review. Interrupted uploads
remain `Pending`; retries resume the same private file reference. An incomplete
upload does not trigger an application notification. Staff must review abandoned
pending applications separately.

Staff update assigned staff, status and follow-up fields. Default status is
`New`; `Retention hold` requires a documented lawful reason and regular review.
There is no SMS or WhatsApp notification integration in this architecture.

## Privacy and retention boundaries

Maintenance permanently removes expired CV files and clears active tracker cells
without shifting row addresses. This does not erase Google Sheets version
history, Vault retention, backups, exports, provider logs or staff emails. Set
those policies separately and verify actual deletion behaviour with Workspace.
Review processor agreements, international transfers, inbox access and the
privacy notice. Implementation alone is not a GDPR compliance certification.
Do not collect identity documents or sensitive personal details in these forms.

## Required live acceptance before switching

- Submit each commercial enquiry type and a recruitment PDF through the preview;
  confirm one persisted record, correct fields, private CV and actual inbox receipt.
- Confirm unrelated staff cannot access recruitment storage; no public/domain ACL.
- Test invalid/replayed challenges, rejected origins, malformed/oversized PDFs,
  firewall limits and duplicate concurrent submissions.
- Interrupt Google responses and CV uploads; retry the same reference and verify
  no extra record/file and no premature notification.
- Interrupt email delivery; verify the saved lead, scheduled retry, delivery and
  manual-review behaviour. Test the maintenance endpoint rejects anonymous calls.
- Test retention using disposable test records, including an authorised hold.
- Inspect browser bundles/network: no helper secret, Resend key or Google
  credentials. Verify sender authentication and the final privacy notice.
- Repeat sales and recruitment checks on the production domain with authorised
  test data, remove the test data and record acceptance with the responsible owner.

Enable server flags and frontend `VITE_*_FORM_PROVIDER=server` first in preview.
Only switch production after acceptance. The two forms can be switched separately.
Rollback frontend provider flags to `web3forms` if required, while keeping server
secrets and maintenance available for already-saved records. There is no automatic
fallback to Web3Forms following a secure submission error.

## Local verification

```sh
npm run test:forms
npm run test:secure-forms
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run build
npm run test:e2e
```

Secure browser tests use controlled provider responses. Rebuild normally after
those tests to restore the default legacy-provider preview bundle.

Provider references: [Turnstile validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
[Google locking](https://developers.google.com/apps-script/reference/lock/lock-service),
[Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys),
[Vercel function limits](https://vercel.com/docs/functions/limitations).
