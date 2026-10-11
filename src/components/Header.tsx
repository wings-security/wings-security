import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { COMPANY, services } from '@/data/site';

export default function Header(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect((): void => {
    setOpen(false);
    header.current?.querySelectorAll('details').forEach((detail: HTMLDetailsElement): void => { detail.open = false; });
  }, [location.pathname, location.search, location.hash]);
  useEffect(() => {
    const close = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
        header.current?.querySelectorAll('details').forEach((detail: HTMLDetailsElement): void => { detail.open = false; });
        if (open) menuButton.current?.focus();
      }
    };
    const outside = (event: MouseEvent): void => {
      if (header.current && !event.composedPath().includes(header.current)) {
        setOpen(false);
        header.current?.querySelectorAll('details').forEach((detail: HTMLDetailsElement): void => { detail.open = false; });
      }
    };
    document.addEventListener('keydown', close);
    document.addEventListener('click', outside);
    return (): void => { document.removeEventListener('keydown', close); document.removeEventListener('click', outside); };
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="utility-bar"><div className="site-container utility-inner"><span><span className="status-dot" /> PSA licensed · Nationwide coverage</span><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}<ArrowUpRight size={13} /></a></div></div>
      <div className="site-container nav-bar">
        <Link to="/" className="brand-link" aria-label="WINGS Security home"><img src={COMPANY.logo} alt="WINGS Security" width="244" height="54" /></Link>
        <nav id="primary-navigation" aria-label="Main navigation" className={`main-nav ${open ? 'is-open' : ''}`}>
          <details className="nav-dropdown"><summary>Services <ChevronDown size={13} /></summary><div className="nav-dropdown-panel"><Link to="/services">Explore all services <ArrowUpRight size={16} /></Link>{services.map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.shortTitle}</Link>)}</div></details>
          <NavLink to="/sectors">Sectors</NavLink><NavLink to="/about">Why WINGS</NavLink><NavLink to="/partnerships">Partnerships</NavLink><NavLink to="/insights">Insights</NavLink><NavLink to="/careers">Careers</NavLink><NavLink to="/contact" className="mobile-contact-link">Contact us</NavLink>
        </nav>
        <div className="nav-actions"><a href={COMPANY.tel} className="nav-phone" aria-label={`Call WINGS on ${COMPANY.phone}`}><Phone size={18} /><span>{COMPANY.phone}</span></a><Link to="/contact" className="button button-green nav-quote">Get a quote <ArrowUpRight size={17} /></Link><button ref={menuButton} className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={(): void => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
      </div>
    </header>
  );
}
