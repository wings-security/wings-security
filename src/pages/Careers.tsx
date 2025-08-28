import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Loader2, Users, Shield, Award, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Careers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    additionalNotes: '',
    gdprConsent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setFileName(file.name);
    }
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

  const benefits = [
    {
      icon: Shield,
      title: "Professional Training",
      description: "Comprehensive security training and ongoing professional development"
    },
    {
      icon: Award,
      title: "Competitive Compensation",
      description: "Fair wages with performance bonuses and growth opportunities"
    },
    {
      icon: Users,
      title: "Supportive Team Environment",
      description: "Join a team that values professionalism and mutual respect"
    }
  ];

  const requirements = [
    "Valid PSA licence (or willingness to obtain one)",
    "Excellent communication skills in English",
    "Professional appearance and demeanor",
    "Reliable and punctual",
    "Clean background check",
    "Physical fitness for security duties"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-secondary/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/20">
                  <Users className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Join Ireland's Most
                <span className="block text-wings-gradient bg-gradient-primary bg-clip-text text-transparent">
                  Trusted Security Team
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Build a rewarding career in security with WINGS Security Ltd. We're always looking for 
                professional, reliable security officers to join our growing team across Ireland.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} className="text-center space-y-4">
                    <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                  What We're Looking For
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join our team of professional security officers
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="glass-card border-wings-grey/20 p-6">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">Requirements</h3>
                  <div className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass-card border-wings-grey/20 p-6">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">Available Positions</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-foreground">Static Security Guards</h4>
                      <p className="text-sm text-muted-foreground">Retail, corporate, and construction sites</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-foreground">Event Security Officers</h4>
                      <p className="text-sm text-muted-foreground">Festivals, concerts, and corporate events</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-foreground">Security Supervisors</h4>
                      <p className="text-sm text-muted-foreground">Leadership roles for experienced officers</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                  Apply Now
                </h2>
                <p className="text-lg text-muted-foreground">
                  Take the first step towards joining our professional security team
                </p>
              </div>

              <Card className="glass-card border-wings-grey/20 bg-white/95 backdrop-blur-md">
                <form 
                  onSubmit={handleSubmit}
                  name="careers-application" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-recaptcha="true" 
                  netlify-honeypot="bot-field"
                  action="/thank-you"
                  encType="multipart/form-data"
                  className="p-8 space-y-6"
                >
                  <input type="hidden" name="form-name" value="careers-application" />
                  <input type="hidden" name="bot-field" />

                  <div className="text-center mb-8">
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      Job Application Form
                    </h3>
                    <p className="text-muted-foreground">
                      All applications are sent directly to info@wingssecurity.ie
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
                      <Label htmlFor="role" className="text-sm font-medium">
                        Role Applying For *
                      </Label>
                      <Select onValueChange={handleSelectChange} name="role" required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="static-guard">Static Security Guard</SelectItem>
                          <SelectItem value="event-security">Event Security Officer</SelectItem>
                          <SelectItem value="supervisor">Security Supervisor</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv-upload" className="text-sm font-medium">
                      Upload CV *
                    </Label>
                    <div className="relative">
                      <Input
                        id="cv-upload"
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {fileName && (
                        <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                          <Upload className="h-4 w-4" />
                          <span>{fileName}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PDF or DOC format only, maximum 5MB
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes" className="text-sm font-medium">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      className="w-full min-h-[120px]"
                      placeholder="Tell us about your experience, availability, or any questions you have..."
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
                      I consent to WINGS Security storing my details in compliance with GDPR and contacting me regarding this application. *
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

                  <div className="text-center pt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Applications are sent directly to{' '}
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
        </section>

        {/* Why Work With Us Section */}
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-foreground mb-12">
                Why Work With WINGS Security?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left space-y-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">Career Growth</h3>
                  <p className="text-muted-foreground">
                    We invest in our team's development with ongoing training, certifications, and clear 
                    advancement pathways from security officer to supervisor roles.
                  </p>
                </div>
                
                <div className="text-left space-y-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">Professional Environment</h3>
                  <p className="text-muted-foreground">
                    Work with Ireland's most professional security company, serving prestigious clients 
                    across retail, corporate, and event sectors.
                  </p>
                </div>
                
                <div className="text-left space-y-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">Technology Integration</h3>
                  <p className="text-muted-foreground">
                    Be part of the future with our IRIS remote guarding platform and modern 
                    security technologies that enhance traditional guarding methods.
                  </p>
                </div>
                
                <div className="text-left space-y-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">Work-Life Balance</h3>
                  <p className="text-muted-foreground">
                    Flexible scheduling options and fair shift rotations that respect your 
                    personal time while maintaining professional service standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;