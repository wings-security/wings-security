import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Shield,
  MessageSquare
} from 'lucide-react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Quote Request Sent!",
      description: "Thank you for your interest. We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "info@wingssecurity.ie",
      description: "Send us your security requirements"
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+353 899899484",
      description: "Speak directly with our security experts"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "Block 1, Blanchardstown Corporate Park",
      description: "Ballycoolin Road, Dublin 15, D15 AKK1"
    },
    {
      icon: Clock,
      title: "Response Time",
      detail: "24 Hours",
      description: "Quick turnaround on all quotes"
    }
  ];

  const services = [
    "Static Guarding",
    "Event Stewarding / Static Event Guards", 
    "IRIS Remote Guarding (Coming Soon)",
    "Security Consultation",
    "Risk Assessment",
    "Other"
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 space-y-4 ${isVisible ? 'wings-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <MessageSquare className="h-4 w-4" />
              <span>Get In Touch</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-wings-black">
              Request Your
              <span className="block text-wings-gradient bg-gradient-primary bg-clip-text text-transparent">
                Free Security Quote
              </span>
            </h2>
            
            <p className="text-xl text-wings-grey max-w-3xl mx-auto">
              Ready to enhance your security? Get a personalized quote tailored to your specific needs. 
              Our team of experts will provide comprehensive recommendations within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className={`${isVisible ? 'wings-slide-up' : 'opacity-0'}`}>
                <h3 className="text-2xl font-display font-bold text-wings-black mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div 
                      key={info.title}
                      className={`flex items-start space-x-4 ${
                        isVisible ? 'wings-fade-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-wings-black">{info.title}</h4>
                        <p className="text-lg text-primary font-medium">{info.detail}</p>
                        <p className="text-sm text-wings-grey">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <Card className={`glass-card border border-white/20 ${isVisible ? 'wings-scale-in' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-wings-black">Fully Licensed & Insured</h4>
                      <p className="text-sm text-wings-grey">PSA Licence No. 14161 - Licensed by the Private Security Authority</p>
                      <p className="text-xs text-wings-grey mt-1">CRO: 772757 · Fully insured across Ireland</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form - Right Column */}
            <div className="lg:col-span-3">
              <Card className={`glass-card border border-white/20 ${isVisible ? 'wings-scale-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <CardTitle className="text-xl font-display font-bold text-wings-black">Get Your Free Quote</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-wings-black">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-wings-black">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium text-wings-black">
                          Company/Organization
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-wings-black">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+353 (0)xx xxx xxxx"
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm font-medium text-wings-black">
                        Service of Interest
                      </Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-wings-black focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-wings-black">
                        Project Details
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your security requirements, location, timing, and any specific concerns..."
                        rows={5}
                        className="w-full resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-wings-primary w-full group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Request...
                        </>
                      ) : (
                        <>
                          Request a Free Quote
                          <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    {/* Guarantee */}
                    <div className="flex items-center space-x-2 text-sm text-wings-grey justify-center">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>24-hour response guarantee • No obligation • Free consultation</span>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;