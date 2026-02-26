import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Loader2, MessageSquare, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WEB3FORMS_ACCESS_KEY = '95eec0fa-47e5-40ad-a3ad-2f43a7a380da';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: 'General Enquiry',
    message: '',
    gdprConsent: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, gdprConsent: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdprConsent) {
      toast({
        title: 'GDPR Consent Required',
        description: 'Please tick the consent box to proceed.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New ${formData.enquiryType}: WINGS Security`,
          from_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          enquiry_type: formData.enquiryType,
          message: formData.message || 'No message provided',
          botcheck: '',
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({ title: 'Message sent', description: "We'll respond within 24 hours." });
        setFormData({ fullName: '', email: '', phone: '', enquiryType: 'General Enquiry', message: '', gdprConsent: false });
      } else {
        throw new Error(result.message);
      }
    } catch {
      toast({
        title: 'Failed to send',
        description: 'Please email info@wingssecurity.ie directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', detail: 'info@wingssecurity.ie', href: 'mailto:info@wingssecurity.ie' },
    { icon: Phone, title: 'Call', detail: '+353 87 369 4378', href: 'tel:+353873694378' },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      detail: 'Message us directly',
      href: 'https://wa.me/353873694378?text=Hi%20WINGS%20Security%2C%20I%27d%20like%20to%20enquire%20about%20your%20security%20services.',
    },
    {
      icon: MapPin,
      title: 'Location',
      detail: 'Blanchardstown Corporate Park, Dublin 15',
      href: 'https://maps.google.com/?q=Blanchardstown+Corporate+Park+Dublin+15',
    },
    { icon: Clock, title: 'Response Time', detail: '24 hours', href: null },
  ];

  return (
    <section id="contact" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Us</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">Ready to discuss your security needs? We respond within 24 hours.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold text-foreground">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-center space-x-4">
                    <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.title}</p>
                      {info.href ? (
                        <a href={info.href} className="text-base font-medium text-foreground hover:text-primary transition-colors">
                          {info.detail}
                        </a>
                      ) : (
                        <p className="text-base font-medium text-foreground">{info.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl overflow-hidden border border-border">
                <iframe
                  title="WINGS Security Ltd - Dublin 15 Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2380.5!2d-6.419700!3d53.394600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDIzJzQwLjYiTiA2wrAyNScxMC45Ilc!5e0!3m2!1sen!2sie!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Block 1, Blanchardstown Corporate Park, Ballycoolin Road, Dublin 15, D15 AKK1
              </p>
            </div>

            <div>
              <Card className="glass-card border-wings-grey/20 bg-white/95 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
                  <h3 className="text-xl font-display font-bold text-foreground text-center">Send us a Message</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="Your full name" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="your@email.ie" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number (optional)</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+353 87 369 4378" />
                  </div>

                  <div className="space-y-1.5">
                    <Label>Enquiry Type *</Label>
                    <Select value={formData.enquiryType} onValueChange={(value) => setFormData((prev) => ({ ...prev, enquiryType: value }))}>
                      <SelectTrigger className="h-12 bg-white border-border text-foreground shadow-sm">
                        <SelectValue placeholder="Select enquiry type" />
                      </SelectTrigger>
                      <SelectContent className="z-[80] bg-white border-border shadow-2xl">
                        <SelectItem className="text-base" value="General Enquiry">General Enquiry</SelectItem>
                        <SelectItem className="text-base" value="Request a Quote">Request a Quote</SelectItem>
                        <SelectItem className="text-base" value="Business Partnership / Subcontracting">Business Partnership / Subcontracting</SelectItem>
                        <SelectItem className="text-base" value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="min-h-[110px] relative z-0"
                      placeholder="Describe your security requirements..."
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox id="gdprConsent" checked={formData.gdprConsent} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="gdprConsent" className="text-sm leading-relaxed">
                      I consent to WINGS Security storing my details in compliance with GDPR. *
                    </Label>
                  </div>

                  <Button type="submit" disabled={isSubmitting || !formData.gdprConsent} className="btn-wings-primary w-full font-bold">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
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
