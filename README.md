# WINGS Security Website

WINGS Security Ltd.'s marketing website, maintained directly in this repository.
Built with React 18, TypeScript, Vite and Tailwind CSS. No Lovable account is required.

## Current Website

The site includes service and sector pages, company information, careers,
partnerships, insights, contact and legal pages. It uses the original WINGS
artwork, responsive imagery and mobile navigation. The build pre-renders 33
public pages for direct links and search indexing.

WYNTRA and IRIS are in development. The secure replacement forms are not yet
enabled: Web3Forms remains the default while account setup and live delivery
checks are completed. Passing automated checks does not establish inbox delivery.

## Run Locally

Use Node.js 22 and npm. From this project folder:

```sh
npm ci
npm run dev
```

Open http://localhost:8080. Changes update automatically.

## Check Before Publishing

```sh
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run test:forms
npm run test:secure-forms
npm run build
npm run test:e2e
npm run preview
```

The build generates the browser bundle, then pre-renders every public route into
HTML with its own title, description, canonical URL and structured data.
The generated sitemap is in `dist/sitemap.xml`. Preview is normally on port 4173.
Browser tests require Google Chrome and start an isolated production preview on port 4174.
The secure-form browser tests use port 4176 and simulated providers. Run the
normal build afterwards to restore the default Web3Forms preview bundle.

## Where to Edit

- `src/data/site.ts`: business contact details, services, sectors, guides and public routes.
- `src/pages/Index.tsx`: homepage.
- `src/pages/Services.tsx`, `Sectors.tsx`, `Insights.tsx`: listing and detail pages.
- `src/pages/Company.tsx`: about, partnerships, technology, contact and careers.
- `src/components/Header.tsx` and `Footer.tsx`: shared navigation.
- `src/index.css`: responsive styles and brand colours.
- `src/styles/premium.css`: current visual tokens, glass surfaces, responsive refinements and reduced-motion rules.
- `src/SiteRoutes.tsx`: page routing.
- `src/lib/metadata.ts`: page titles, descriptions and structured data.
- `public/images/`: responsive WebP imagery; generated environments are not actual staff or client photographs.
- `public/brand/`: original WINGS artwork with transparent padding cropped, not redrawn.
- `docs/website-refinement-report.md`: verification scope and remaining launch checks.

When adding a page, register its route, metadata and public path so it is included
in the production HTML and sitemap. WYNTRA and IRIS remain labelled as in development.
Specialist-provider services must not be represented as additional WINGS licence categories.

## Forms

The secure Turnstile/Vercel/Google Workspace/Resend integration is staged but
inactive. Web3Forms remains the default until live acceptance. Follow
[`docs/forms-setup.md`](docs/forms-setup.md) for account inputs, private CV storage,
deployment, retries, retention and the cutover checklist.

Contact and careers requests use Web3Forms. The integration is in
`src/lib/submissions.ts`. The Web3Forms public access key is intentionally used
by the browser; never place private credentials or GitHub tokens here.

CV uploads are optional and depend on the Web3Forms account supporting attachments.
If the provider rejects an upload, the form displays the failure and preserves
the application details. Applicants can remove the attachment and email their CV.
There is no silent retry without the file and no success message for a rejected request.

Successful careers submissions also send contact details to the existing Google
Apps Script endpoint. Its deployment must accept the JSON text payload and allow
the browser to read its response. Tracking failure is reported separately from email delivery.

Web3Forms sends notifications to the mailbox associated with the configured public
access key, not to the applicant's email field. The code does not expose that mailbox
mapping; confirm it in the Web3Forms dashboard. The applicant's email is the reply-to.
Contact requests do not use Apps Script. Careers tracking contains name, email,
phone, role and source, not the CV file. No SMS or WhatsApp notification integration
is implemented in this website. Automatic replies require provider-side configuration.

Before launch, perform an authorised live enquiry and application and confirm
receipt in the business inbox and tracking destination. Browser smoke checks
with intercepted responses do not establish live delivery.

## Deployment

Vercel: build command `npm run build`, output directory `dist`.
Keep both `VITE_SALES_FORM_PROVIDER` and `VITE_CAREERS_FORM_PROVIDER` unset or
`web3forms`, and leave `SALES_FORM_ENABLED` and `CAREERS_FORM_ENABLED` unset or
`false` until the secure-form acceptance checklist is complete. Provider changes
require a rebuild. `.env.example` documents the settings without credentials.
The static page files handle direct links. Do not add a catch-all rewrite that
serves the homepage for every URL. The build also generates `404.html`.

Review the diff, validate the build, and commit/push only when approved.
Publishing requires repository and hosting access.
Review the privacy notice, retention practices and specialist-provider agreements before launch.
