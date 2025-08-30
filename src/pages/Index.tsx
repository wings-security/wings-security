import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import QuoteForm from '@/components/QuoteForm';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import CareersSection from '@/components/CareersSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <QuoteForm />
        <ServicesSection />
        <AboutSection />
        <CareersSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
