import { articles, COMPANY, publicPaths, sectors, services } from '@/data/site';
import { breadcrumbsFor } from '@/lib/navigation';

export interface PageMetadata { title: string; description: string; path: string; noindex: boolean }
const fixedPages: Readonly<Record<string, readonly [string, string]>> = {
  '/': ['Security Guarding & Event Security Ireland', 'WINGS Security provides static guarding, event security and specialist-provider coordination across the Republic of Ireland. PSA Licence 14161.'],
  '/services': ['Security Services Ireland', 'Explore static guarding, event security, reception security and specialist-provider coordination with WINGS Security.'],
  '/sectors': ['Security Guarding by Sector', 'Discuss guarding requirements for construction, retail, offices, logistics, residential property, education, healthcare and events in Ireland.'],
  '/about': ['About WINGS & PSA Licensing', 'Meet WINGS Security Ltd., based in Dublin and taking enquiries nationwide. PSA Licence 14161 for Static and Event Security guarding.'],
  '/partnerships': ['Security Subcontracting & Partnerships Ireland', 'Discuss recurring, temporary and event-guarding cover with WINGS Security. A dedicated enquiry route for security-company partnerships.'],
  '/technology': ['WYNTRA & IRIS: In Development', 'Learn about WYNTRA, the WINGS workforce-readiness project, and IRIS, a future remote-guarding initiative. Neither is a live client platform.'],
  '/insights': ['Security Planning Guides & Insights', 'Practical WINGS guides to preparing a guarding brief, planning event security and requesting a useful security quote in Ireland.'],
  '/careers': ['Security Careers Ireland', 'Register your interest in static guarding, event security and reception-security opportunities with WINGS Security across Ireland.'],
  '/contact': ['Contact WINGS & Request a Security Quote', 'Contact WINGS Security at info@wingssecurity.ie or +353 87 369 4378. Office hours Monday-Friday, 09:00-17:00. Calls and WhatsApp outside office hours.'],
  '/privacy-policy': ['Privacy Policy', 'How WINGS Security handles enquiry and application information, including forms, CVs and your data-protection rights.'],
  '/terms-of-service': ['Terms of Service', 'Website and enquiry terms for WINGS Security Ltd. A quote enquiry does not confirm a booking or create a service contract.'],
  '/thank-you': ['Thank You', 'Contact WINGS Security for enquiries about your submission.'],
};

export function getPageMetadata(path: string): PageMetadata {
  const normalised: string = path === '/' ? '/' : path.replace(/\/$/, '');
  const fixed = fixedPages[normalised];
  if (fixed) return { title: fixed[0] + ' | WINGS Security', description: fixed[1], path: normalised, noindex: normalised === '/thank-you' };
  const service = services.find((item) => normalised === '/services/' + item.slug);
  if (service) return { title: service.shortTitle + ' Ireland | WINGS Security', description: service.summary, path: normalised, noindex: false };
  const sector = sectors.find((item) => normalised === '/sectors/' + item.slug);
  if (sector) return { title: sector.title + ' Security Ireland | WINGS Security', description: sector.summary, path: normalised, noindex: false };
  const article = articles.find((item) => normalised === '/insights/' + item.slug);
  if (article) return { title: article.title + ' | WINGS Security', description: article.summary, path: normalised, noindex: false };
  return { title: 'Page Not Found | WINGS Security', description: 'Find WINGS services, insights and contact details.', path: normalised, noindex: true };
}

export function structuredData(path: string): string {
  const metadata: PageMetadata = getPageMetadata(path);
  const article = articles.find((item) => path === '/insights/' + item.slug);
  const service = services.find((item) => path === '/services/' + item.slug);
  const crumbs = breadcrumbsFor(path);
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': ['Organization', 'LocalBusiness'], '@id': 'https://wingssecurity.ie/#organisation', name: 'WINGS Security Ltd.', url: 'https://wingssecurity.ie/', logo: 'https://wingssecurity.ie' + COMPANY.logo, telephone: '+353873694378', email: COMPANY.email, areaServed: { '@type': 'Country', name: 'Ireland' }, identifier: [{ '@type': 'PropertyValue', name: 'CRO', value: '772757' }, { '@type': 'PropertyValue', name: 'PSA licence', value: '14161' }], address: { '@type': 'PostalAddress', streetAddress: 'Block 1, Office 156, Blanchardstown Corporate Park 1', addressLocality: 'Dublin 15', addressCountry: 'IE' }, contactPoint: { '@type': 'ContactPoint', telephone: '+353873694378', contactType: 'customer enquiries', hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' } } },
      { '@type': article ? 'Article' : 'WebPage', '@id': 'https://wingssecurity.ie' + metadata.path, url: 'https://wingssecurity.ie' + metadata.path, name: metadata.title, description: metadata.description, ...(article ? { headline: article.title, datePublished: '2026-10-10', author: { '@id': 'https://wingssecurity.ie/#organisation' }, publisher: { '@id': 'https://wingssecurity.ie/#organisation' }, image: 'https://wingssecurity.ie' + article.image } : {}) },
      ...(service ? [{ '@type': 'Service', '@id': 'https://wingssecurity.ie' + metadata.path + '#service', name: service.delivery === 'specialist' ? 'Specialist security coordination' : service.shortTitle, serviceType: service.shortTitle, description: service.summary, provider: { '@id': 'https://wingssecurity.ie/#organisation' }, areaServed: { '@type': 'Country', name: 'Ireland' }, url: 'https://wingssecurity.ie' + metadata.path }] : []),
      ...(crumbs.length > 1 ? [{ '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: 'https://wingssecurity.ie' + crumb.path })) }] : []),
    ],
  }).replace(/</g, '\\u003c');
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function renderMetadata(path: string): string {
  const meta: PageMetadata = getPageMetadata(path);
  return `${path === "/" ? '<link rel="preload" as="image" href="/images/hero-guarding-branded.webp" imagesrcset="/images/hero-guarding-branded-small.webp 768w, /images/hero-guarding-branded.webp 1536w" imagesizes="100vw" fetchpriority="high" />' : ""}
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}" />
<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow'}" />
<link rel="canonical" href="https://wingssecurity.ie${escapeHtml(meta.path)}" />
<meta property="og:title" content="${escapeHtml(meta.title)}" />
<meta property="og:description" content="${escapeHtml(meta.description)}" />
<meta property="og:url" content="https://wingssecurity.ie${escapeHtml(meta.path)}" />
<meta property="og:type" content="${path.startsWith('/insights/') ? 'article' : 'website'}" />
<meta property="og:image" content="https://wingssecurity.ie/images/hero-guarding-branded.webp" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(meta.title)}" />
<meta name="twitter:description" content="${escapeHtml(meta.description)}" />
<meta name="twitter:image" content="https://wingssecurity.ie/images/hero-guarding-branded.webp" />
<script id="page-schema" type="application/ld+json">${structuredData(path)}</script>`;
}

export { publicPaths };
