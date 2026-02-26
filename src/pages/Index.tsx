import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TrustedIndustries from '@/components/TrustedIndustries';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AreasServed from '@/components/AreasServed';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import CareersSection from '@/components/CareersSection';
import ContactForm from '@/components/ContactForm';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <main role="main">
      <HeroSection />
      <ServicesSection />
      <TrustedIndustries />
      <StatsSection />
      <TestimonialsSection />
      <AreasServed />
      <AboutSection />
      <FAQSection />
      <CareersSection />
      <ContactForm />
    </main>
    <FloatingCTA />
    <Footer />
  </div>
);

export default Index;
