import type { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '@/data/site';
import { ArticleCard, PageHero, QuoteCTA, SiteImage } from '@/components/site/Elements';
import NotFound from './NotFound';

export function Insights(): JSX.Element {
  return <><PageHero eyebrow="INSIGHTS & GUIDES" title="Make your next decision a clearer one." description="Practical starting points for planning guarding, briefing a provider and arranging event cover." /><section className="section-space"><div className="site-container article-grid">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></section><QuoteCTA /></>;
}

export function InsightDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFound />;
  return <><PageHero eyebrow={article.category} title={article.title} description={article.summary} /><section className="section-space"><div className="site-container article-layout"><article className="reading-column"><div className="byline"><span>WINGS Security</span><span>10 October 2026</span><span>{article.minutes} min read</span></div><SiteImage className="detail-image" src={article.image} alt={article.category.toLowerCase() + " environment"} loading="eager" sizes="(max-width: 700px) 100vw, 760px" />{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}{article.slug === 'choosing-a-security-provider' && <p>Check current categories and licence status in the <a className="text-link" href="https://www.psa-gov.ie/psa-registered-contractors/">PSA contractor register</a>.</p>}<div className="article-end"><p>General planning guidance, not a site-specific risk assessment or legal advice. Your requirements should be assessed before agreeing cover.</p><Link to={`/services/${article.service}`} className="text-link">Explore the relevant service <ArrowUpRight size={18} /></Link></div></article></div></section><QuoteCTA /></>;
}
