import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, CheckCircle, Eye } from 'lucide-react';
import heroBackground from '@/assets/hero-security-professional.jpg';
import wingElement from '@/assets/wing-element.png';
import lockIcon from '@/assets/lock-icon.png';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    { icon: Shield, text: "Licensed Security Professionals" },
    { icon: Eye, text: "24/7 Monitoring & Response" },
    { icon: CheckCircle, text: "Trusted by Ireland Businesses" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="Professional security guard" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Branded Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={wingElement} 
          alt=""
          className="absolute top-20 left-10 w-32 h-32 animate-pulse opacity-30"
        />
        <img 
          src={lockIcon} 
          alt=""
          className="absolute bottom-20 right-10 w-24 h-24 animate-pulse opacity-20"
          style={{ animationDelay: '1s' }}
        />
        <img 
          src={wingElement} 
          alt=""
          className="absolute top-1/2 right-1/4 w-20 h-20 animate-pulse opacity-25"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`space-y-8 ${isVisible ? 'wings-fade-in' : 'opacity-0'}`}>
              <div className="glass-card p-8 rounded-2xl border border-white/20 backdrop-blur-md bg-white/10">
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center space-x-2 bg-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
                    <Shield className="h-4 w-4" />
                    <span>Professional Security Services</span>
                  </div>

                  {/* Main Headline */}
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight text-white">
                      You're covered while our guards are at work.
                    </h1>
                    
                    <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
                      Professional, insured security services across Ireland — trusted by businesses nationwide.
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div 
                        key={index}
                        className={`flex items-center space-x-3 ${isVisible ? 'wings-slide-up' : 'opacity-0'}`}
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-white/90 font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className={`flex flex-col sm:flex-row gap-4 pt-6 ${isVisible ? 'wings-scale-in' : 'opacity-0'}`}>
                    <Button 
                      onClick={() => scrollToSection('contact')}
                      className="btn-wings-primary group"
                    >
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
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;