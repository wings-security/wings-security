import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroBackground from '@/assets/hero-irish-security-guard.jpg';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with dark overlay for contrast */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Professional Irish security guard on duty at retail location"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Centered glass overlay content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 rounded-2xl border border-white/20 backdrop-blur-md bg-white/10">
            <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight text-white">
              You’re covered while our guards are at work.
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-white/90 leading-relaxed">
              Professional, licensed, and insured — trusted by Irish businesses nationwide.
            </p>
            
            {/* Compliance Strip */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center space-x-3 backdrop-blur-sm bg-white/5 rounded-full px-6 py-3">
                <img 
                  src="/lovable-uploads/eac190f7-5b85-4894-8bf0-136c102d125f.png" 
                  alt="PSA Licensed" 
                  className="h-7 w-auto"
                />
                <span className="text-white font-medium text-[15px] sm:text-[16px] text-center">
                  Licensed by the Private Security Authority — PSA Licence No. 14161 • CRO: 772757
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollToSection('contact')} className="btn-wings-primary group">
                Request a Free Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                onClick={() => scrollToSection('services')}
                variant="outline"
                className="btn-wings-secondary bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Get a Consultation
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
