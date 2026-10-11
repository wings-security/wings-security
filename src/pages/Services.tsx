import type { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { serviceDetails, services } from '@/data/site';
import { Checklist, PageHero, QuoteCTA, ServiceCard, SiteImage } from '@/components/site/Elements';
import NotFound from './NotFound';

export function Services(): JSX.Element {
  return <><PageHero eyebrow="OUR SERVICES" title="Security for what matters to you." description="From a regular guarding presence to a one-off event. Explore the right starting point for your requirements." /><section className="section-space"><div className="site-container service-grid service-grid-four">{services.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div></section><QuoteCTA /></>;
}

export function ServiceDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFound />;
  const details = serviceDetails[service.slug];
  return <>
    <PageHero eyebrow={service.label} title={service.title} description={service.summary} />
    <section className="section-space">
      <div className="site-container detail-layout">
        <article className="detail-body">
          <SiteImage className="detail-image" src={service.image} alt={service.shortTitle + ' environment'} loading="eager" sizes="(max-width: 700px) 100vw, 65vw" />
          <h2>{service.shortTitle}, around your requirements.</h2><p>{service.introduction}</p>
          <h2>Where this service fits</h2>
          <div className="use-case-grid">{details.useCases.map((useCase) => <div className="use-case-card" key={useCase.title}><h3>{useCase.title}</h3><p>{useCase.description}</p></div>)}</div>
          <h2>The duties we agree with you</h2><Checklist items={service.duties} />
          <h2>A service with a clear structure</h2><Checklist items={details.outcomes} />
          <h2>Getting started</h2><p>{service.preparation}</p>
          <details className="faq"><summary>Can you discuss temporary and recurring cover?</summary><p>Yes. Include your preferred start date, days, hours and duration. We assess staffing and suitability before agreeing cover.</p></details>
          <details className="faq"><summary>Where do you take enquiries?</summary><p>Across the Republic of Ireland. Tell us the location and duties so we can assess the requirement and confirm availability.</p></details>
          <details className="faq"><summary>What happens after I request a quote?</summary><p>We review your brief and discuss the scope, delivery arrangements and commercial terms. Your booking is confirmed through the written agreement.</p></details>
        </article>
        <aside className="detail-sidebar">
          <p className="eyebrow">LET'S TALK ABOUT YOUR REQUIREMENT</p><h2>The right cover starts here.</h2><p>Share the location, dates, hours and duties. We will help you shape the brief.</p>
          <Link className="button button-green" to={`/contact?service=${encodeURIComponent(service.shortTitle)}&source=${encodeURIComponent(`/services/${service.slug}`)}`}>Request a quote <ArrowUpRight size={18} /></Link>
          <Link className="text-link" to="/services">Explore all services</Link>
          <p className="sidebar-note">{service.delivery === 'specialist' ? 'Specialist-provider delivery. The proposal confirms licensing, scope and responsibilities.' : 'WINGS Security Ltd. PSA Licence 14161: static and event guarding.'}</p>
        </aside>
      </div>
    </section>
    <QuoteCTA />
  </>;
}
