import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '@/data/site';

export default function ThankYou(): JSX.Element {
  return <section className="section-pad"><div className="site-container narrow-copy">
    <p className="eyebrow">WINGS SECURITY</p><h1>Thank you for getting in touch.</h1>
    <p>A successful form submission displays its confirmation on the form itself. This page alone does not confirm delivery or a booking.</p>
    <p>Our office hours are {COMPANY.hours}. Outside those hours, you can reach us on the same phone number or WhatsApp.</p>
    <div className="button-row"><Link className="button button-green" to="/contact">Contact WINGS</Link><Link className="button button-outline" to="/">Back to home</Link></div>
  </div></section>;
}
