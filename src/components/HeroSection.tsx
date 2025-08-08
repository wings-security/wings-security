import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroBackground from '@/assets/hero-security-guard.jpg';

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
          alt="Licensed Irish security guard on duty"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Centered glass overlay content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 rounded-2xl border border-white/20 backdrop-blur-md bg-white/10">
            <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight text-white">
              You’re covered while our guards are at work.
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-white/90 leading-relaxed">
              Professional, insured security services across Ireland — trusted by businesses nationwide.
            </p>

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
