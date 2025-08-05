import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, CheckCircle, Eye } from 'lucide-react';

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
    { icon: CheckCircle, text: "Trusted by Dublin Businesses" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/12 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className={`space-y-8 ${isVisible ? 'wings-fade-in' : 'opacity-0'}`}>
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
                <Shield className="h-4 w-4" />
                <span>Licensing in Progress</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  You're covered
                  <span className="block text-wings-gradient bg-gradient-primary bg-clip-text text-transparent">
                    while our guards
                  </span>
                  <span className="block text-white">are at work.</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl">
                  Professional security services across Dublin with cutting-edge technology 
                  and experienced personnel protecting what matters most to you.
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
                  Request Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  className="btn-wings-secondary bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Our Services
                </Button>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className={`relative ${isVisible ? 'wings-scale-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              <div className="relative">
                {/* Main Security Visual */}
                <div className="relative w-full h-96 lg:h-[500px] bg-gradient-card rounded-3xl overflow-hidden shadow-wings-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                  
                  {/* Floating Cards */}
                  <div className="absolute top-8 left-8 bg-card p-4 rounded-xl shadow-wings-lg wings-hover-lift">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">System Online</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-8 right-8 bg-card p-4 rounded-xl shadow-wings-lg wings-hover-lift">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">24/7 Active</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 left-8 bg-card p-4 rounded-xl shadow-wings-lg wings-hover-lift">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Dublin Coverage</span>
                    </div>
                  </div>

                  {/* Central Security Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 animate-pulse-glow">
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