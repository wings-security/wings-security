import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Users, 
  Eye, 
  Clock, 
  MapPin, 
  ArrowRight,
  Zap,
  UserCheck
} from 'lucide-react';
import staticGuardImage from '@/assets/security-guard-static.jpg';
import eventSecurityImage from '@/assets/event-security.jpg';
import irisRemoteImage from '@/assets/iris-remote.jpg';

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
      description: "Professional security personnel for retail, corporate, and construction sites across Ireland.",
      features: [
        "Trained security professionals",
        "Access control management", 
        "Incident response protocols",
        "Regular patrol schedules"
      ],
      image: staticGuardImage,
      iconColor: "text-primary",
      available: true
    },
    {
      icon: Users,
      title: "Event Stewarding / Static Event Guards", 
      description: "Specialized security solutions for events of all sizes, ensuring safety and smooth operations.",
      features: [
        "Crowd management expertise",
        "VIP protection services",
        "Emergency response planning",
        "Coordination with local authorities"
      ],
      image: eventSecurityImage,
      iconColor: "text-wings-grey-dark",
      available: true
    },
    {
      icon: Eye,
      title: "IRIS Remote Guarding",
      description: "Coming Soon – IRIS is our next-gen remote guarding solution.",
      features: [
        "Remote monitoring technology",
        "Real-time response protocols",
        "Advanced analytics",
        "24/7 monitoring center"
      ],
      image: irisRemoteImage,
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
            <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              <span>Our Services</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-wings-black">
              Comprehensive Security
              <span className="block text-wings-gradient bg-gradient-primary bg-clip-text text-transparent">
                Solutions for Ireland
              </span>
            </h2>
            
            <p className="text-xl text-wings-grey max-w-3xl mx-auto">
              From traditional security guarding to cutting-edge remote monitoring, 
              we provide tailored solutions that adapt to your unique security needs across Ireland.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className={`glass-card relative overflow-hidden group cursor-pointer border border-white/20 ${
                  visibleCards.includes(index) 
                    ? 'wings-scale-in' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Coming Soon Badge */}
                {service.comingSoon && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>Coming Soon</span>
                    </div>
                  </div>
                )}

                <CardHeader className="space-y-4 pb-4">
                  <div className="w-full h-48 rounded-lg overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                      <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                      <span className="text-white font-semibold">{service.title}</span>
                    </div>
                  </div>
                  
                  <div>
                    <CardDescription className="text-wings-grey text-base">
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
                        <span className="text-sm text-wings-grey">{feature}</span>
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
                        Request a Free Quote
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
              </Card>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-wings-black">24/7 Availability</h3>
              <p className="text-wings-grey">Round-the-clock security services when you need them most.</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-wings-black">Serving all of Ireland</h3>
              <p className="text-wings-grey">Headquartered in Dublin, operating nationwide across Ireland.</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
                <UserCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-wings-black">Licensed Professionals</h3>
              <p className="text-wings-grey">We are fully insured with licensing in progress.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;