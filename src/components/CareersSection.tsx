import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Loader2, Upload, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CareersSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    gdprConsent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Show success message
      toast({
        title: "✅ Thanks! We've received your message. We'll get back to you as soon as possible.",
        description: "",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        role: '',
        gdprConsent: false
      });
      setFileName('');
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
    <section id="careers" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <Users className="h-4 w-4" />
              <span>Join Our Team</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Careers at WINGS Security
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in joining WINGS Security? We're always looking for qualified static and event security professionals.
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
                  Apply Now
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
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
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
                  <Label htmlFor="role" className="text-sm font-medium">
                    Role applying for *
                  </Label>
                  <Select onValueChange={handleSelectChange} name="role" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static-security">Static Security</SelectItem>
                      <SelectItem value="event-guard">Event Guard</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv-upload" className="text-sm font-medium">
                  File Upload (CV) *
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
  );
};

export default CareersSection;