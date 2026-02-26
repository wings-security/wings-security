import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TrustBullets from '@/components/TrustBullets';
import heroImage from '@/assets/hero-security-team.jpg';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional Irish security team at corporate location"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="container mx-auto px-6 pt-10 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center -translate-y-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 text-sm text-white/90 mb-5">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0" />
            PSA Licensed · Fully Insured · Dublin Based · Nationwide Coverage
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)]">
            You're covered while our guards are at work.
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-white/95 leading-relaxed drop-shadow-md">
            Professional, licensed, and insured - trusted by Irish businesses nationwide.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center space-x-3 backdrop-blur-sm bg-white/5 rounded-full px-6 py-3">
              <img
                src="/lovable-uploads/eac190f7-5b85-4894-8bf0-136c102d125f.png"
                alt="PSA Licensed"
                className="h-10 w-auto object-contain"
              />
              <span className="text-white font-medium text-[15px] sm:text-[16px] text-center">
                Licensed by the Private Security Authority - PSA Licence No. 14161 • CRO: 772757
              </span>
            </div>
          </div>

          <TrustBullets />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection('contact')} className="btn-wings-primary group font-bold shadow-2xl">
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="btn-wings-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
