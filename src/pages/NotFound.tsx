import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound(): JSX.Element {
  return <section className="not-found site-container"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>Let's get you<br />back on track.</h1><p>The page you're looking for isn't here. Explore our services or speak to the WINGS team.</p><div className="hero-buttons"><Link to="/" className="button button-green">Back to WINGS <ArrowUpRight size={18} /></Link><Link to="/contact" className="button button-light">Contact us</Link></div></section>;
}
