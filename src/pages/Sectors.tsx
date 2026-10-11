import type { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { sectorImages, sectors } from '@/data/site';
import { Checklist, PageHero, QuoteCTA, SiteImage } from '@/components/site/Elements';
import NotFound from './NotFound';

export function Sectors(): JSX.Element {
  return <><PageHero eyebrow="SECTORS WE SUPPORT" title="Security for the way you work." description="Every workplace and event has different priorities. Explore how guarding can support your environment." /><section className="section-space"><div className="site-container"><div className="sector-grid sector-gallery">{sectors.map((sector) => <Link key={sector.slug} to={`/sectors/${sector.slug}`} className="sector-card"><SiteImage src={sectorImages[sector.slug]} alt={sector.title + ' environment'} className="sector-photo" loading="lazy" sizes="(max-width: 700px) 100vw, 33vw" /><div><h2>{sector.title}</h2><p>{sector.summary}</p><span className="text-link">Explore sector <ArrowUpRight size={18} /></span></div></Link>)}</div></div></section><QuoteCTA /></>;
}

export function SectorDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const sector = sectors.find((item) => item.slug === slug);
  if (!sector) return <NotFound />;
  return <><PageHero eyebrow="SECTOR FOCUS" title={sector.title} description={sector.summary} /><section className="section-space"><div className="site-container detail-layout"><article className="detail-body"><SiteImage className="detail-image" src={sectorImages[sector.slug]} alt={sector.title + ' environment'} loading="eager" sizes="(max-width: 700px) 100vw, 65vw" /><h2>A brief built around your environment.</h2><p>{sector.brief}</p><h2>Areas to discuss</h2><Checklist items={sector.focus} /><h2>From enquiry to agreed cover</h2><p>Share the site location, dates, operating hours and duties. We will discuss the requirements with you before confirming staffing, delivery arrangements and a written scope. Required screening and credentials are checked against the assignment.</p><p>WINGS provides static and event guarding. We can also coordinate installation, monitoring and door-supervision requirements with appropriately licensed specialist providers.</p></article><aside className="detail-sidebar"><p className="eyebrow">START WITH YOUR SITE</p><h2>What does good cover look like for you?</h2><p>Tell us about your environment. We will help define the next step.</p><Link className="button button-green" to={`/contact?service=${encodeURIComponent(slug === 'events' ? 'Event security' : 'Static guarding')}&sector=${sector.slug}&source=${encodeURIComponent(`/sectors/${sector.slug}`)}`}>Discuss your requirements <ArrowUpRight size={18} /></Link><Link to="/sectors" className="text-link">View all sectors</Link><Link to={slug === 'events' ? '/services/event-security' : '/services/static-guarding'} className="text-link">Explore the guarding service</Link></aside></div></section><QuoteCTA /></>;
}
