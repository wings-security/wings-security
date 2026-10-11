import type { JSX, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import type { Article, Service } from '@/data/site';
import { COMPANY } from '@/data/site';
import { breadcrumbsFor } from '@/lib/navigation';
import type { Breadcrumb } from '@/lib/navigation';

export function SiteImage({ src, alt, className, loading, sizes }: { src: string; alt: string; className: string; loading: 'eager' | 'lazy'; sizes: string }): JSX.Element {
  return <img src={src} srcSet={`${src.replace('.webp', '-small.webp')} 768w, ${src} 1536w`} sizes={sizes} alt={alt} className={className} width="1536" height="1024" loading={loading} decoding="async" />;
}

export function CircleWord({ word }: { word: string }): JSX.Element {
  return <span className="circle-word">{word}<svg aria-hidden="true" viewBox="0 0 140 64" preserveAspectRatio="none"><ellipse cx="70" cy="32" rx="67" ry="27" /></svg></span>;
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }): JSX.Element {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }): JSX.Element {
  const { pathname } = useLocation();
  const crumbs: readonly Breadcrumb[] = breadcrumbsFor(pathname);
  return <section className="page-hero"><div className="site-container"><nav aria-label="Breadcrumb" className="breadcrumb">{crumbs.map((crumb, index) => <span key={crumb.path}>{index > 0 && <ArrowRight size={12} />}{index === crumbs.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link to={crumb.path}>{crumb.name}</Link>}</span>)}</nav><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></section>;
}
export function ServiceCard({ service, index }: { service: Service; index: number }): JSX.Element {
  return <Link to={`/services/${service.slug}`} className="service-card"><div className="service-image"><SiteImage src={service.image} alt={`${service.shortTitle} environment`} className="" loading="lazy" sizes="(max-width: 700px) 100vw, 45vw" /><span className="card-number">0{index + 1}</span>{service.delivery === 'specialist' && <span className="image-tag">Specialist partners</span>}</div><div className="service-card-body"><p className="eyebrow">{service.label}</p><h3>{service.shortTitle}<ArrowUpRight size={23} /></h3><p>{service.summary}</p><span className="text-link">Explore service <ArrowRight size={16} /></span></div></Link>;
}
export function ArticleCard({ article }: { article: Article }): JSX.Element {
  return <Link to={`/insights/${article.slug}`} className="article-card"><div className="article-image"><SiteImage src={article.image} alt={article.category.toLowerCase() + ' environment'} className="" loading="lazy" sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="article-meta"><span>{article.category}</span><span>{article.minutes} MIN READ</span></div><h3>{article.title}</h3><p>{article.summary}</p><span className="text-link">Read the guide <ArrowUpRight size={17} /></span></Link>;
}
export function Checklist({ items }: { items: readonly string[] }): JSX.Element {
  return <ul className="checklist">{items.map((item: string) => <li key={item}><Check size={18} /><span>{item}</span></li>)}</ul>;
}
export function QuoteCTA(): JSX.Element {
  return <section className="quote-cta"><div className="site-container quote-cta-inner"><div><p className="eyebrow">LET'S TALK SECURITY</p><h2>Your next step.<br />Our full attention.</h2><p>Tell us what you need, where and when. Let's build the right brief.</p></div><div className="cta-actions"><Link to="/contact" className="button button-dark">Request a quote <ArrowUpRight size={19} /></Link><a href={COMPANY.tel} className="cta-phone">{COMPANY.phone}</a></div></div></section>;
}
export function LicenceStrip(): JSX.Element {
  return <div className="licence-strip"><div className="site-container licence-inner"><div className="licence-identity"><img src={COMPANY.psa} width="180" height="52" alt="Private Security Authority" /><span className="licence-detail">PSA LICENCE <strong>14161</strong></span></div><span className="licence-scope"><ShieldCheck size={19} /> Static & event guarding</span><span className="licence-detail licence-coverage">REPUBLIC OF IRELAND <strong>Nationwide enquiries</strong></span></div></div>;
}
export function ContentPanel({ children }: { children: ReactNode }): JSX.Element {
  return <div className="content-panel">{children}</div>;
}
