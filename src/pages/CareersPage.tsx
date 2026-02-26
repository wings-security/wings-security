import { useEffect } from 'react';
import Header from '@/components/Header';
import CareersSection from '@/components/CareersSection';
import ContactForm from '@/components/ContactForm';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';

const CareersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Careers at WINGS Security Ltd. | Security Jobs Ireland';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main role="main">
        <section className="pt-24 pb-12 bg-background text-center px-6">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground">Careers at WINGS Security</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Explore security career opportunities with a PSA-licensed team serving clients across Ireland.
          </p>
        </section>
        <CareersSection />
        <ContactForm />
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default CareersPage;
