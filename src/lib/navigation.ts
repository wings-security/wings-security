import { articles, sectors, services } from '@/data/site';

export interface Breadcrumb { name: string; path: string }
const pageNames: Readonly<Record<string, string>> = {
  services: 'Services', sectors: 'Sectors', about: 'About WINGS',
  partnerships: 'Partnerships', technology: 'WYNTRA & IRIS',
  insights: 'Insights', careers: 'Careers', contact: 'Contact',
  'privacy-policy': 'Privacy Policy', 'terms-of-service': 'Terms of Service',
};

export function breadcrumbsFor(path: string): readonly Breadcrumb[] {
  const parts: readonly string[] = path.split('/').filter(Boolean);
  const home: Breadcrumb = { name: 'Home', path: '/' };
  if (parts.length === 0) return [home];
  const parent: Breadcrumb = { name: pageNames[parts[0]] || 'Page', path: '/' + parts[0] };
  if (parts.length === 1) return [home, parent];
  const recordName: string | undefined = parts[0] === 'services'
    ? services.find((service) => service.slug === parts[1])?.shortTitle
    : parts[0] === 'sectors'
      ? sectors.find((sector) => sector.slug === parts[1])?.title
      : articles.find((article) => article.slug === parts[1])?.title;
  return [home, parent, { name: recordName || 'Page', path }];
}
