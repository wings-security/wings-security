import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPageMetadata, structuredData } from '@/lib/metadata';

export default function RouteDocument(): null {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef<string>(pathname);
  useEffect((): void => {
    const redirects: Readonly<Record<string, string>> = { '#contact': '/contact', '#careers': '/careers' };
    if (pathname === '/' && redirects[hash]) { navigate(redirects[hash], { replace: true }); return; }
    const meta = getPageMetadata(pathname);
    document.title = meta.title;
    const update = (attribute: 'name' | 'property', key: string, value: string): void => {
      let element: HTMLMetaElement | null = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.appendChild(element); }
      element.content = value;
    };
    update('name', 'description', meta.description);
    update('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');
    update('property', 'og:title', meta.title);
    update('property', 'og:description', meta.description);
    update('property', 'og:url', 'https://wingssecurity.ie' + meta.path);
    update('property', 'og:type', pathname.startsWith('/insights/') ? 'article' : 'website');
    update('name', 'twitter:title', meta.title);
    update('name', 'twitter:description', meta.description);
    let canonical: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = 'https://wingssecurity.ie' + meta.path;
    let schema: HTMLScriptElement | null = document.querySelector('#page-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'page-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema); }
    schema.textContent = structuredData(pathname);
    if (hash) {
      const target: HTMLElement | null = document.getElementById(hash.slice(1));
      target?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (previousPath.current !== pathname) document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    previousPath.current = pathname;
  }, [pathname, hash, navigate]);
  return null;
}
