import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, CheckCircle, Eye } from 'lucide-react';
import heroBackground from '@/assets/hero-security-guard.jpg';
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
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
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
                    <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight">
                      <span className="text-white block mb-2">You're covered while</span>
                      <span className="block text-wings-gradient bg-gradient-primary bg-clip-text text-transparent">
                        our guards are at work.
                      </span>
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

            {/* Right Column - Glassmorphism Visual */}
            <div className={`relative ${isVisible ? 'wings-scale-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-30">
                <img 
                  src={lockIcon} 
                  alt=""
                  className="absolute top-10 right-10 w-16 h-16 animate-pulse"
                />
                <img 
                  src={wingElement} 
                  alt=""
                  className="absolute bottom-20 left-10 w-20 h-20 animate-pulse"
                  style={{ animationDelay: '1s' }}
                />
              </div>

              <div className="relative">
                {/* Main Security Visual with Glassmorphism */}
                <div className="relative w-full h-96 lg:h-[500px] glass-card rounded-3xl overflow-hidden shadow-wings-glass-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                  
                  {/* Floating Glass Cards */}
                  <div className="absolute top-8 left-8 glass-card p-4 rounded-xl shadow-wings-lg wings-hover-lift">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-white">Fully Insured & Licensed</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-8 right-8 glass-card p-4 rounded-xl shadow-wings-lg wings-hover-lift">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-white">24/7 Active</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 left-8 glass-card p-4 rounded-xl shadow-wings-lg wings-hover-lift">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-white">Ireland Coverage</span>
                    </div>
                  </div>

                  {/* Central Security Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 glass-card rounded-full flex items-center justify-center border border-primary/30 animate-pulse-glow">
                        <Shield className="h-16 w-16 text-primary" />
                      </div>
                      
                      {/* Orbiting Elements */}
                      <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 bg-primary rounded-full animate-float"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-primary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-4 h-4 bg-primary rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-4 h-4 bg-primary rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
                      </div>
                    </div>
                  </div>
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