import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Users, 
  Eye, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight,
  Zap,
  Building,
  UserCheck
} from 'lucide-react';

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards one by one
            [0, 1, 2].forEach((index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Shield,
      title: "Static Guarding",
      description: "Professional security personnel providing comprehensive protection for your premises, assets, and people.",
      features: [
        "Trained security professionals",
        "Access control management", 
        "Incident response protocols",
        "Regular patrol schedules"
      ],
      bgColor: "bg-gradient-to-br from-primary/10 to-primary/5",
      iconColor: "text-primary",
      available: true
    },
    {
      icon: Users,
      title: "Event Security", 
      description: "Specialized security solutions for events of all sizes, ensuring safety and smooth operations throughout Dublin.",
      features: [
        "Crowd management expertise",
        "VIP protection services",
        "Emergency response planning",
        "Coordination with local authorities"
      ],
      bgColor: "bg-gradient-to-br from-wings-grey/20 to-wings-grey/10",
      iconColor: "text-wings-grey-dark",
      available: true
    },
    {
      icon: Eye,
      title: "IRIS Remote Guarding",
      description: "Next-generation AI-powered remote monitoring system combining advanced technology with human expertise.",
      features: [
        "AI-powered threat detection",
        "Real-time response protocols",
        "Advanced analytics dashboard",
        "24/7 monitoring center"
      ],
      bgColor: "bg-gradient-to-br from-accent/15 to-accent/8",
      iconColor: "text-accent",
      available: false,
      comingSoon: true
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              <span>Our Services</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Comprehensive Security
              <span className="block text-wings-gradient bg-gradient-primary bg-clip-text text-transparent">
                Solutions for Dublin
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From traditional security guarding to cutting-edge remote monitoring, 
              we provide tailored solutions that adapt to your unique security needs.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className={`card-wings relative overflow-hidden group cursor-pointer ${
                  visibleCards.includes(index) 
                    ? 'wings-scale-in' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Coming Soon Badge */}
                {service.comingSoon && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>Coming Soon</span>
                    </div>
                  </div>
                )}

                <CardHeader className="space-y-4 pb-4">
                  <div className={`w-full h-32 ${service.bgColor} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                    <service.icon className={`h-16 w-16 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    
                    {/* Floating Elements */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-current opacity-20 rounded-full animate-float"></div>
                    <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-current opacity-30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-base mt-2">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 ${service.iconColor} rounded-full opacity-60`}></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    {service.available ? (
                      <Button 
                        onClick={scrollToContact}
                        variant="outline" 
                        className="w-full group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        Get Quote
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        disabled
                        className="w-full opacity-60 cursor-not-allowed"
                      >
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">24/7 Availability</h3>
              <p className="text-muted-foreground">Round-the-clock security services when you need them most.</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Dublin Coverage</h3>
              <p className="text-muted-foreground">Comprehensive security solutions across Dublin and surrounding areas.</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Licensed Professionals</h3>
              <p className="text-muted-foreground">Fully trained and licensed security personnel you can trust.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;