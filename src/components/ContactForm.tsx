import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Loader2, MessageSquare, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    gdprConsent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, gdprConsent: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      toast({
        title: "GDPR Consent Required",
        description: "Please provide consent to process your data.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission - in production this would be handled by Netlify
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "✅ Thanks! We've received your message. We'll be in touch shortly.",
        description: "",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        gdprConsent: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      detail: "+353 87 369 4378",
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
      description: "Quick turnaround on all inquiries"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Us</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to discuss your security needs? Contact us today for a consultation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={info.title} className="flex items-start space-x-4">
                      <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-foreground">{info.title}</h4>
                        <p className="text-lg text-primary font-medium">{info.detail}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="glass-card border-wings-grey/20 bg-white/95 backdrop-blur-md">
                <form 
                  onSubmit={handleSubmit}
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-recaptcha="true" 
                  netlify-honeypot="bot-field"
                  action="/thank-you"
                  className="p-8 space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-display font-bold text-foreground">
                      Send us a Message
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="your.email@example.ie"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="+353 87 369 4378"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full min-h-[120px]"
                      placeholder="How can we help you? Please describe your inquiry..."
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="gdprConsent"
                      checked={formData.gdprConsent}
                      onCheckedChange={handleCheckboxChange}
                      required
                    />
                    <Label htmlFor="gdprConsent" className="text-sm leading-relaxed">
                      I consent to WINGS Security storing my details in compliance with GDPR. *
                    </Label>
                  </div>

                  <div className="g-recaptcha" data-sitekey="6LdHb7YrAAAAAJEnPnAdMMjvJMaHElfejAdkllXp"></div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.gdprConsent}
                    className="btn-wings-primary w-full group font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Messages are sent directly to{' '}
                      <a href="mailto:info@wingssecurity.ie" className="text-primary hover:underline font-medium">
                        info@wingssecurity.ie
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Questions? Call us at{' '}
                      <a href="tel:+353873694378" className="text-primary hover:underline font-medium">
                        +353 87 369 4378
                      </a>
                    </p>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;