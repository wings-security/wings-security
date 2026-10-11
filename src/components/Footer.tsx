import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Facebook, Instagram, Linkedin } from 'lucide-react';
import { COMPANY, services } from '@/data/site';

export default function Footer(): JSX.Element {
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-top">
      <div className="footer-brand"><Link to="/"><img src={COMPANY.logo} alt="WINGS Security home" width="230" height="50" /></Link><p>People first.<br />Protection with purpose.</p><span>Dublin based. Republic of Ireland coverage.</span><div className="social-links"><a href="https://www.linkedin.com/company/wings-security-limited/" aria-label="WINGS on LinkedIn"><Linkedin size={19} /></a><a href="https://www.instagram.com/wings_security" aria-label="WINGS on Instagram"><Instagram size={19} /></a><a href="https://www.facebook.com/profile.php?id=61579733607665" aria-label="WINGS on Facebook"><Facebook size={19} /></a></div></div>
      <div><h2>Our services</h2>{services.map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.shortTitle}</Link>)}<Link to="/sectors">Sectors we support</Link></div>
      <div><h2>Discover WINGS</h2><Link to="/about">About & licensing</Link><Link to="/partnerships">Work with us</Link><Link to="/technology">WYNTRA & IRIS</Link><Link to="/insights">Insights & guides</Link><Link to="/careers">Careers</Link></div>
      <div className="footer-contact"><h2>Start a conversation</h2><a href={COMPANY.tel}>{COMPANY.phone} <ArrowUpRight size={14} /></a><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><a href={COMPANY.whatsapp}>Message on WhatsApp <ArrowUpRight size={14} /></a><p>Office: Mon-Fri, 09:00-17:00<br />Outside office hours: call or WhatsApp.</p><p>{COMPANY.address}</p></div>
    </div>
    <div className="footer-licence"><span>PSA Licence No. 14161</span><span>WINGS Security Ltd. · CRO 772757</span><a href="https://www.psa-gov.ie/psa-registered-contractors/">Check the PSA register <ArrowUpRight size={14} /></a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} WINGS Security Ltd.</span><div><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-of-service">Terms of Service</Link></div></div>
  </div></footer>;
}
