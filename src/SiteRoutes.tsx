import type { JSX } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteDocument from '@/components/site/RouteDocument';
import Index from '@/pages/Index';
import { Services, ServiceDetail } from '@/pages/Services';
import { Sectors, SectorDetail } from '@/pages/Sectors';
import { Insights, InsightDetail } from '@/pages/Insights';
import { About, Careers, Contact, Partnerships, Technology } from '@/pages/Company';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';
import ThankYou from '@/pages/ThankYou';

function SiteLayout(): JSX.Element {
  return <><Header /><main id="main-content" tabIndex={-1}><Outlet /></main><Footer /></>;
}

export default function SiteRoutes(): JSX.Element {
  return <><RouteDocument /><Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/sectors" element={<Sectors />} />
      <Route path="/sectors/:slug" element={<SectorDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/partnerships" element={<Partnerships />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/insights/:slug" element={<InsightDetail />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
  </Routes></>;
}
