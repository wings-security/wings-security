import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Building2, CalendarDays, Check, Cpu, MapPin, ShieldCheck, Users } from 'lucide-react';
import { COMPANY, IMAGES, articles, sectors, services } from '@/data/site';
import { ArticleCard, CircleWord, LicenceStrip, QuoteCTA, SectionHeading, ServiceCard, SiteImage } from '@/components/site/Elements';

export default function Index(): JSX.Element {
  return <>
    <section className="home-hero" id="home">
      <SiteImage className="hero-photo" src={IMAGES.hero} alt="Two security officers coordinating at a commercial venue entrance" loading="eager" sizes="100vw" />
      <div className="hero-shade" />
      <div className="site-container hero-content">
        <p className="eyebrow"><span className="status-dot" /> WINGS SECURITY · IRELAND</p>
        <h1>Securing tomorrow.<br /><CircleWord word="Today." /></h1>
        <p className="hero-description">Professional people. A considered plan.<br className="desktop-break" /> Security for your workplace, your event and everything that matters.</p>
        <div className="hero-assurances"><span><Check size={16} /> PSA licensed</span><span><Check size={16} /> Dublin based</span><span><Check size={16} /> Nationwide coverage</span></div>
        <div className="hero-buttons"><Link to="/contact" className="button button-green">Get a quote <ArrowUpRight size={20} /></Link><Link to="/services" className="button button-outline-light">Explore services <ArrowRight size={18} /></Link></div>
      </div>
      <div className="hero-bottom"><div className="site-container"><span>PEOPLE. PLACES. PEACE OF MIND.</span><Link to="/partnerships">Your next security partner <ArrowUpRight size={16} /></Link></div></div>
    </section>
    <LicenceStrip />

    <section className="welcome-section section-space" id="about">
      <div className="site-container intro-grid">
        <div className="welcome-copy">
          <SectionHeading eyebrow="WELCOME TO WINGS SECURITY" title="Protection with purpose. People at its heart." description="A security service should fit your business. Your environment. Your people." />
          <p>WINGS Security Ltd. is a Dublin-based security company providing static guarding, event security and front-of-house security across the Republic of Ireland.</p>
          <p>From an ongoing workplace assignment to a busy event, we work with businesses, property teams and security companies to build the right cover. Clear duties, a practical brief and agreed responsibilities come first.</p>
          <p>For installation, monitoring and door supervision, we coordinate the appropriate specialist provision alongside your guarding requirements.</p>
          <div className="intro-points"><span><ShieldCheck size={20} /> PSA Licence 14161</span><span><Users size={20} /> Direct clients & security partners</span><span><MapPin size={20} /> Republic of Ireland</span></div>
          <Link className="text-link" to="/about">Get to know WINGS <ArrowUpRight size={18} /></Link>
        </div>
        <div className="welcome-visual"><SiteImage src={IMAGES.reception} alt="A professional reception and access-controlled entrance" className="welcome-photo" loading="lazy" sizes="(max-width: 700px) 100vw, 45vw" /><div className="welcome-glass"><ShieldCheck size={28} /><div><strong>A reassuring presence.</strong><span>A clear point of contact. An agreed plan.</span></div></div></div>
      </div>
    </section>

    <section className="section-space services-section" id="services">
      <div className="site-container">
        <div className="section-top"><SectionHeading eyebrow="WHAT WE DO" title="Security, around you." description="Ongoing cover or a one-off requirement. Explore the service that fits your site, event or organisation." /><Link to="/services" className="text-link">All services <ArrowUpRight size={18} /></Link></div>
        <div className="service-grid service-grid-four">{services.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div>
      </div>
    </section>

    <section className="section-space sectors-section" id="sectors">
      <div className="site-container">
        <div className="section-top"><SectionHeading eyebrow="WHERE WE WORK" title="Different environments. The same attention." description="Every assignment has its own priorities. Start with your sector, then tell us what your site needs." /><Link className="text-link" to="/sectors">Explore all sectors <ArrowUpRight size={18} /></Link></div>
        <div className="sector-grid">{sectors.slice(0, 6).map((sector, index) => <Link key={sector.slug} to={`/sectors/${sector.slug}`} className="sector-card"><span className="sector-index">0{index + 1}</span><h3>{sector.title}</h3><p>{sector.summary}</p><ArrowUpRight size={22} /></Link>)}</div>
      </div>
    </section>

    <section className="process-section">
      <div className="site-container">
        <SectionHeading eyebrow="A CLEAR WAY FORWARD" title="From first conversation to agreed cover." description="A straightforward process, built around the details that matter." />
        <div className="process-grid">{[
          { title: 'Tell us what you need', text: 'Your location, dates, operating hours and the people or property you need to protect.' },
          { title: 'Shape the right service', text: 'We discuss guarding duties, site requirements, staffing and any specialist provision.' },
          { title: 'Start with a shared plan', text: 'Scope, contacts, reporting arrangements and commercial terms are agreed before work starts.' },
        ].map((step, index) => <div className="process-step" key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div>
      </div>
    </section>

    <section className="technology-teaser">
      <div className="site-container tech-grid">
        <div><p className="eyebrow">THE NEXT CHAPTER</p><h2>People first.<br /><span>Better systems behind them.</span></h2><p>We are developing WYNTRA to support workforce readiness, shift coordination and attendance. IRIS is our future direction for remote guarding.</p><Link to="/technology" className="text-link">Discover WYNTRA & IRIS <ArrowUpRight size={18} /></Link></div>
        <div className="tech-illustration" aria-label="WYNTRA development concept"><div className="tech-label"><Cpu size={19} /><span>WYNTRA</span><small>IN DEVELOPMENT</small></div><div className="concept-line"><ShieldCheck /><span>Workforce readiness</span><span className="concept-status">PLANNED</span></div><div className="concept-line"><CalendarDays /><span>Shift coordination</span><span className="concept-status">PLANNED</span></div><div className="concept-line"><Building2 /><span>Attendance records</span><span className="concept-status">PLANNED</span></div></div>
      </div>
    </section>

    <section className="section-space" id="insights">
      <div className="site-container"><div className="section-top"><SectionHeading eyebrow="INSIGHTS & GUIDES" title="A little clarity goes a long way." description="Useful thinking for your next security decision, from a better brief to event planning." /><Link className="text-link" to="/insights">All insights <ArrowUpRight size={18} /></Link></div><div className="article-grid">{articles.slice(0, 3).map((article) => <ArticleCard article={article} key={article.slug} />)}</div></div>
    </section>

    <section className="opportunity-section" id="careers">
      <div className="site-container opportunity-grid">
        <Link to="/partnerships"><span className="eyebrow">SECURITY-COMPANY PARTNERSHIPS</span><h2>Good cover starts with a good partner.</h2><p>Discuss recurring, temporary or event guarding with WINGS.</p><span className="text-link">Work with WINGS <ArrowUpRight size={18} /></span></Link>
        <Link to="/careers" className="careers-opportunity"><span className="eyebrow">CAREERS AT WINGS</span><h2>Bring your professionalism. Find your place.</h2><p>Register your interest in security opportunities across Ireland.</p><span className="text-link">Apply today <ArrowUpRight size={18} /></span></Link>
      </div>
    </section>
    <QuoteCTA />
  </>;
}
