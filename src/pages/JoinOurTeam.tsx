import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Loader2, Users, Shield, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const JoinOurTeam = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    psaLicence: '',
    role: '',
    availability: '',
    gdprConsent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        title: "Application Submitted!",
        description: "We'll review your application and contact you soon.",
      });

      // Redirect to thank you page
      window.location.href = '/thank-you';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background to-secondary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/20">
                  <Users className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                Join Our Team
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Become part of Ireland's most trusted security team. We're always looking for 
                professional, reliable security officers to join our growing company.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center space-y-3">
                  <Shield className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Professional Training</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive training and ongoing development</p>
                </div>
                <div className="text-center space-y-3">
                  <Award className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Competitive Pay</h3>
                  <p className="text-sm text-muted-foreground">Fair compensation with growth opportunities</p>
                </div>
                <div className="text-center space-y-3">
                  <Users className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Supportive Team</h3>
                  <p className="text-sm text-muted-foreground">Join a team that values professionalism</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <Card className="glass-card border-wings-grey/20 bg-white/95 backdrop-blur-md">
                <form 
                  onSubmit={handleSubmit}
                  name="join-team" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-recaptcha="true" 
                  netlify-honeypot="bot-field"
                  action="/thank-you"
                  className="p-8 space-y-6"
                >
                  <input type="hidden" name="form-name" value="join-team" />
                  <input type="hidden" name="bot-field" />

                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                      Application Form
                    </h2>
                    <p className="text-muted-foreground">
                      Complete the form below to apply for a position with WINGS Security
                    </p>
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

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="+353 87 369 4378"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="psaLicence" className="text-sm font-medium">
                        PSA Licence Number
                      </Label>
                      <Input
                        id="psaLicence"
                        name="psaLicence"
                        value={formData.psaLicence}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Optional - PSA licence number"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-sm font-medium">
                        Role Interested In
                      </Label>
                      <Select onValueChange={handleSelectChange('role')} name="role">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="static-guarding">Static Guarding</SelectItem>
                          <SelectItem value="event-security">Event Security</SelectItem>
                          <SelectItem value="stewarding">Stewarding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability" className="text-sm font-medium">
                        Availability
                      </Label>
                      <Select onValueChange={handleSelectChange('availability')} name="availability">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="festivals">Festivals</SelectItem>
                          <SelectItem value="any">Any</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv-upload" className="text-sm font-medium">
                      Upload CV
                    </Label>
                    <Input
                      id="cv-upload"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      PDF or DOC format only, max 5MB
                    </p>
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
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="text-center pt-4">
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinOurTeam;