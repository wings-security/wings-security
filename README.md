# WINGS Security Website

Official website for WINGS Security Ltd.

## Company Details

- Website: [https://wingssecurity.ie](https://wingssecurity.ie)
- Company: WINGS Security Ltd.
- PSA Licence: 14161
- CRO: 772757
- Email: info@wingssecurity.ie
- Phone: +353 87 369 4378
- Address: Block 1, Blanchardstown Corporate Park, Ballycoolin Road, Dublin 15, D15 AKK1

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui

## Local Development

Prerequisites:

- Node.js 18+
- npm

Run locally:

```bash
git clone https://github.com/wings-security/wings-security.git
cd wings-security
npm install
npm run dev
```

Default local URL:

```bash
http://127.0.0.1:8080/
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Key Pages and Routes

- `/` - Main single-page website
- `/careers` - Careers landing page
- `/privacy-policy` - Privacy Policy
- `/terms-of-service` - Terms of Service

## Forms

The site uses Web3Forms for:

- Contact enquiries
- Careers applications

Careers submissions also instruct applicants to email their CV to `info@wingssecurity.ie`.

## SEO and Public Files

Important public assets and metadata:

- `public/site.webmanifest`
- `public/sitemap.xml`
- `public/llms.txt`
- `public/opensearch.xml`
- favicon files in `public/`

## Deployment

This project is intended to deploy on Vercel.

Recommended workflow:

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

Then deploy or redeploy from Vercel.

## Repo Notes

- This repo is no longer managed through Lovable.
- Use GitHub as the source of truth.
- Keep the site as a single-page layout with anchor navigation for the main marketing site.
- Run `npm run build` before pushing changes.

## Maintainer Workflow

For future edits:

1. Pull the latest `main`
2. Create your changes locally
3. Run `npm run build`
4. Commit with a clear message
5. Push to `main` or open a pull request if needed

## Contact

For business or website updates:

- Email: info@wingssecurity.ie
- Phone: +353 87 369 4378
