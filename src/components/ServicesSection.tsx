import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Users,
  Eye,
  ArrowRight,
  Zap,
} from 'lucide-react';
import staticGuardImage from '@/assets/static-guard-irish.jpg';
import eventSecurityImage from '@/assets/event-security-irish.jpg';
import irisImage from '@/assets/iris-ai-monitoring.jpg';

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            [0, 1, 2].forEach((index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Shield,
      title: 'Static Guarding',
      description: 'Professional security personnel for retail, corporate, and construction sites across Ireland.',
      features: [
        'Fully Insured professionals',
        'Access control management',
        'Incident response protocols',
        'Regular patrol schedules',
      ],
      image: staticGuardImage,
      iconColor: 'text-primary',
      available: true,
    },
    {
      icon: Users,
      title: 'Event Stewarding / Static Event Guards',
      description: 'Specialized security solutions for events of all sizes, ensuring safety and smooth operations.',
      features: [
        'Crowd management expertise',
        'VIP protection services',
        'Emergency response planning',
        'Coordination with local authorities',
      ],
      image: eventSecurityImage,
      iconColor: 'text-wings-grey-dark',
      available: true,
    },
    {
      icon: Eye,
      title: 'IRIS Remote Guarding (Coming Soon)',
      description: 'Coming Soon - IRIS is our next-gen remote guarding solution.',
      features: [
        'Remote monitoring technology',
        'Real-time response protocols',
        'Advanced technology',
        'Proactive deterrence',
      ],
      image: irisImage,
      iconColor: 'text-accent',
      available: false,
      comingSoon: true,
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={`glass-card relative overflow-hidden group cursor-pointer border border-white/20 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 transition-all duration-300 ${
                  visibleCards.includes(index)
                    ? 'wings-scale-in'
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 ${service.iconColor} rounded-full opacity-60`} />
                        <span className="text-sm text-wings-grey">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    {service.available ? (
                      <Button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-wings-primary w-full group font-bold"
                      >
                        Send Us a Quote
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

                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-primary font-medium hover:underline mt-2 flex items-center gap-1"
                  >
                    Enquire about this service <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
