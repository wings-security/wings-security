import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Loader2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    projectDetails: '',
    gdprConsent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
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
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with your free quote.",
      });

      // Redirect to thank you page
      window.location.href = '/thank-you';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-20 bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Request a Free Quote
            </h2>
            <p className="text-lg text-muted-foreground">
              Get a tailored security solution for your business within 24 hours
            </p>
          </div>

          <Card className="glass-card border-wings-grey/20 bg-white/95 backdrop-blur-md">
            <form 
              onSubmit={handleSubmit}
              name="quote-request" 
              method="POST" 
              data-netlify="true" 
              data-netlify-recaptcha="true" 
              netlify-honeypot="bot-field"
              action="/thank-you"
              className="p-8 space-y-6"
            >
              <input type="hidden" name="form-name" value="quote-request" />
              <input type="hidden" name="bot-field" />

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
                    placeholder="your.email@company.ie"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Your company name"
                  />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm font-medium">
                  Service of Interest
                </Label>
                <Select onValueChange={handleSelectChange} name="service">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static-guarding">Static Guarding</SelectItem>
                    <SelectItem value="event-security">Event Security</SelectItem>
                    <SelectItem value="stewarding">Stewarding</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDetails" className="text-sm font-medium">
                  Project Details
                </Label>
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="w-full min-h-[120px]"
                  placeholder="Please describe your security requirements, location, schedule, and any specific needs..."
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

              <div data-netlify-recaptcha="true"></div>

              <Button
                type="submit"
                disabled={isSubmitting || !formData.gdprConsent}
                className="btn-wings-primary w-full group font-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    Request Free Quote
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <div className="text-center pt-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Quote requests are sent directly to{' '}
                  <a href="mailto:info@wingssecurity.ie" className="text-primary hover:underline font-medium">
                    info@wingssecurity.ie
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>24-hour response guarantee • No obligation • Free consultation</span>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;