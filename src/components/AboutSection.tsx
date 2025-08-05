import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Award, 
  Users, 
  Target,
  CheckCircle,
  TrendingUp,
  Heart,
  Zap
} from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  const stats = [
    { number: "24/7", label: "Monitoring", icon: Shield },
    { number: "100%", label: "Licensed", icon: Award },
    { number: "Dublin", label: "Coverage", icon: Target },
    { number: "Professional", label: "Service", icon: Users }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "Building lasting relationships through consistent, dependable security services.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Embracing cutting-edge technology to enhance traditional security methods.",
      color: "text-accent"
    },
    {
      icon: Heart,
      title: "Community Focus",
      description: "Committed to protecting and serving the Dublin business community.",
      color: "text-wings-grey-dark"
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "Continuously improving our services to exceed client expectations.",
      color: "text-primary"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 space-y-4 ${isVisible ? 'wings-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <Users className="h-4 w-4" />
              <span>About WINGS</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Professional Security
              <span className="block text-wings-gradient bg-gradient-primary bg-clip-text text-transparent">
                You Can Trust
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              WINGS Security Ltd. represents a new standard in Dublin's security industry, 
              combining experienced professionals with innovative technology to deliver 
              comprehensive protection solutions.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Story */}
            <div className={`space-y-6 ${isVisible ? 'wings-slide-up' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Founded with a vision to revolutionize security services in Dublin, WINGS Security Ltd. 
                  bridges the gap between traditional security methods and modern technological solutions. 
                  Our commitment to excellence drives us to continuously evolve and adapt to meet the 
                  changing security needs of our community.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Why Choose WINGS?</h3>
                <div className="space-y-3">
                  {[
                    "Licensing in progress with full compliance planned",
                    "Experienced security professionals from diverse backgrounds",
                    "Technology-enhanced traditional security methods", 
                    "Rapid response capabilities across Dublin",
                    "Customized security solutions for every client"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className={`space-y-6 ${isVisible ? 'wings-scale-in' : 'opacity-0'}`}>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card 
                    key={stat.label}
                    className={`card-wings text-center p-6 ${
                      isVisible ? 'wings-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0 space-y-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Technology Preview */}
              <Card className="card-wings overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-6 w-6 text-primary" />
                      <h4 className="text-lg font-semibold text-foreground">Technology Integration</h4>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Our upcoming IRIS remote guarding system represents the future of security monitoring, 
                      combining AI-powered detection with human expertise for unparalleled protection.
                    </p>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-primary rounded-full w-3/4 animate-pulse"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">Development Progress</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Values Section */}
          <div className={`${isVisible ? 'wings-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">Our Core Values</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={value.title}
                  className={`card-wings text-center group ${
                    isVisible ? 'wings-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
                      <value.icon className={`h-8 w-8 ${value.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;