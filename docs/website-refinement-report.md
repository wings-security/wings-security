# Website Refinement Review

## Current Experience

The website contains 33 public routes: company pages, service and sector pages,
practical security guides, contact, careers and legal information. The homepage
uses the brand's "Securing tomorrow. Today." headline, an environmental hero,
clear service navigation and contextual enquiry links.

The visual system combines forest tones, WINGS green, off-white reading surfaces,
restrained glass panels, fluid headings and rounded image cards. Glass is not used
behind form input text. Mobile layouts reflow rather than shrinking desktop text.
Native scrolling remains intact. Decorative movement respects reduced-motion settings.

Static guarding and event pages describe relevant assignment types, responsibilities
and preparation. Additional hospitality and small-business sectors support visitors
who do not fit the larger corporate categories. Installation, monitoring and
door-supervision enquiries are distinguished from WINGS' static/event licence scope.
WYNTRA and IRIS are not presented as operational products.

Testimonials and customer logos are omitted at the user's request. No customer
endorsements, assignment photographs or performance statistics are invented.

## Assets And Branding

The wordmark and symbol are cropped from the supplied original transparent artwork.
New favicon sizes preserve the whole symbol. Fifteen separate generated environments
cover a campus, construction, retail, events, reception, monitoring, logistics,
housing, education, healthcare, public buildings, pharmaceutical sites, hospitality,
small businesses and corporate offices. All twelve sectors have distinct imagery.
The eight additional asset prompts are recorded in `docs/sector-image-prompts.json`.
The homepage uses a separate people-led guarding image, with a desktop/mobile crop,
recorded in `docs/hero-image-prompt.json`. Its officers are generated subjects, not
actual WINGS employees. The hero preload and social preview use this same asset.
The active branded variant adds green uniform prints using the original wordmark
as the editing reference. Its prompt is in `docs/hero-uniform-logo-prompt.json`.
These images are not evidence of actual employees or customer assignments.
They contain no generated WINGS logos. Responsive WebP variants reduce image transfer;
full-size images are approximately 100-210 KB each, with smaller mobile variants.

The public captions requested for removal are absent. This report retains asset
provenance for future maintainers. Actual commissioned photographs remain preferable
when available. The interactive contact map loads only when the visitor selects it.

## Journeys And Verification

- General visitors: homepage, service or sector information, contextual contact form.
- Event organisers: event use cases, role boundaries, enquiry preparation and contact.
- Partners: dedicated partnership page and preselected partnership enquiry.
- Applicants: careers page, role selection, consent, optional CV and email-CV guidance.
- Returning visitors: direct phone, email, WhatsApp and office hours.

The nine Playwright integration checks cover all public routes, unique metadata,
internal navigation, one H1 per page, mobile overflow, menu dismissal, reduced motion,
contact validation and contextual fields, careers attachment validation, provider
failure preservation, successful submission UI, map loading, breadcrumbs, legacy
anchors, the 404 page, unique sector-image loading, header phone alignment and intended
behaviour under production content-security policy. The decorative circle appears
only in the homepage hero. Mobile navigation uses a 44-pixel phone target and menu;
the main quote action stays in the hero rather than crowding the header.
The browser favicon uses the original green symbol on transparency, cropped to
remove padding and versioned to avoid the previous cached asset. Its transparency
and visible width are checked in-browser. The PSA logo is cropped from the supplied
licence artwork without redrawing it; the logo and licence number stay grouped.
Form responses in this suite are intercepted: they do not verify real delivery.

Responsive checks include widths 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920.
Manual visual screenshots cover desktop and mobile. The before screenshots represent
the last committed website, not the immediately preceding uncommitted design.

- Build: passes, including prerendered pages and sitemap generation.
- Application TypeScript check: passes.
- Lint: zero errors, seven existing Fast Refresh warnings in shared UI components.
- Source em-dash sweep: no matches in TypeScript, TSX or CSS.
- Before/after screenshots: `docs/qa/`.

## Launch Checks Still Required

1. Confirm real contact and application receipt in the business inbox. Labelled
   QA enquiry and application attempts did not establish provider acceptance.
   The live application displayed "Failed to fetch". A separate read-only browser
   probe reported a CORS failure; a command-line GET returned HTTP 403. This does not
   establish production-domain behaviour or the cause of the provider rejection.
   No inbox delivery claim is made.
2. Confirm the Web3Forms account supports CV uploads. Its earlier free-plan rejection
   cannot be fixed by frontend code. Applicants can submit details and email their CV;
   rejected attachments produce an explicit error rather than false success.
3. Replace or repair the Apps Script deployment: a read-only GET returned HTTP 404
   with "Page not found" and "the file you have requested does not exist".
   The code sends accepted careers details to this endpoint, but its actual storage
   destination and permissions are not available in this repository.
   Then verify the POST and resulting record. Frontend tests do not establish backend storage.
4. Resolve remaining dependency advisories. The compatible update left 13 advisories
   (seven moderate, six high); major upgrades require a separate regression-tested change.
   The focused first-party security review is partial coverage, not a certification.
5. After deployment, verify the configured security headers, clean URLs, actual 404
   status, sitemap, search-console access and third-party integrations on the live domain.
6. Perform real-device Safari and Android checks. Current automated tests use Chrome.
   Bundle sizes and local responsiveness do not establish field Core Web Vitals.
7. Confirm legal wording, retention practices and specialist agreements against actual
   business operations. Search placement is not guaranteed by new pages or structured data.

The working website is available locally. These changes have not been committed,
pushed or published. No private credentials belong in the repository.
