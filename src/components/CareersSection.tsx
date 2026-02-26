import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Loader2, Upload, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WEB3FORMS_ACCESS_KEY = '95eec0fa-47e5-40ad-a3ad-2f43a7a380da';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpV2eRM-5cuBROfbiYLSkgzgkoaT1s8tv2hFq10BF7OAR9W5TAby3mvU_admMu18bI/exec';
const WEB3FORMS_FILE_UPLOAD_ERROR = 'upgrade to use file uploads';

const CareersSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', role: '', gdprConsent: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Maximum file size is 5MB.', variant: 'destructive' });
      return;
    }
    setCvFile(file);
    setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdprConsent) {
      toast({ title: 'GDPR Consent Required', variant: 'destructive' });
      return;
    }
    if (!formData.role) {
      toast({ title: 'Please select a role', variant: 'destructive' });
      return;
    }
    if (!cvFile) {
      toast({ title: 'Please upload your CV', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const submitJson = async () => {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New Job Application - ${formData.role} - WINGS Security`,
            from_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            role_applying_for: formData.role,
            message: `Role: ${formData.role} | Phone: ${formData.phone} | CV: ${cvFile.name} | GDPR: Yes`,
            botcheck: '',
          }),
        });
        const result = await response.json();
        return { response, result };
      };

      const submitWithAttachment = async () => {
        const data = new FormData();
        data.append('access_key', WEB3FORMS_ACCESS_KEY);
        data.append('subject', `New Job Application - ${formData.role} - WINGS Security`);
        data.append('from_name', formData.fullName);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('role_applying_for', formData.role);
        data.append('message', `Role: ${formData.role} | Phone: ${formData.phone} | CV: ${cvFile.name} | GDPR: Yes`);
        data.append('botcheck', '');
        data.append('attachment', cvFile, cvFile.name);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: data,
        });
        const result = await response.json();
        return { response, result };
      };

      let { response, result } = await submitWithAttachment();
      const message = typeof result?.message === 'string' ? result.message : '';

      if (!result?.success && message.toLowerCase().includes(WEB3FORMS_FILE_UPLOAD_ERROR)) {
        ({ response, result } = await submitJson());
      }

      if (response.ok && result.success) {
        toast({
          title: 'Application received',
          description: 'One more step: please email your CV to info@wingssecurity.ie',
          duration: 8000,
        });
        fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            source: 'Careers Form - wingssecurity.ie',
          }),
        }).catch(() => {});
        setFormData({ fullName: '', email: '', phone: '', role: '', gdprConsent: false });
        setCvFile(null);
        setFileName('');
      } else {
        const apiMessage = typeof result?.message === 'string' ? result.message : 'Please email your CV to info@wingssecurity.ie';
        toast({
          title: 'Submission failed',
          description: `${apiMessage}. You can also email your CV to info@wingssecurity.ie.`,
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Submission failed',
        description: 'Please email your CV to info@wingssecurity.ie',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="careers" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <Users className="h-4 w-4" />
              <span>Join Our Team</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Careers at WINGS Security</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're always looking for qualified, PSA-licensed security professionals across Ireland.
            </p>
          </div>

          <Card className="glass-card border-wings-grey/20 bg-white/95 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
              <h3 className="text-xl font-display font-bold text-foreground text-center mb-2">Apply Now</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="Your full name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required placeholder="+353 87 369 4378" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="your@email.ie" />
                </div>
                <div className="space-y-1.5">
                  <Label>Role *</Label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                    className="flex h-12 w-full items-center rounded-md border border-input bg-white px-3 py-2 text-base text-foreground shadow-sm outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="" disabled>Select a role</option>
                    <option value="Static Security Guard">Static Security Guard</option>
                    <option value="Event Security Guard">Event Security Guard</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cv-upload">Upload CV *</Label>
                <Input
                  id="cv-upload"
                  name="attachment"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {fileName && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Upload className="h-3.5 w-3.5" />
                    {fileName}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">PDF or DOC, max 5MB</p>
                </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="gdprConsent" checked={formData.gdprConsent} onCheckedChange={(c) => setFormData((p) => ({ ...p, gdprConsent: c as boolean }))} />
                <Label htmlFor="gdprConsent" className="text-sm leading-relaxed">
                  I consent to WINGS Security storing my details in compliance with GDPR. *
                </Label>
              </div>

              <Button type="submit" disabled={isSubmitting || !formData.gdprConsent} className="btn-wings-primary w-full font-bold">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center text-sm">
                <p className="font-semibold text-foreground mb-1">Also send your CV</p>
                <p className="text-muted-foreground">
                  Email your CV to{' '}
                  <a
                    href="mailto:info@wingssecurity.ie?subject=CV Application - WINGS Security"
                    className="text-primary font-medium hover:underline"
                  >
                    info@wingssecurity.ie
                  </a>
                  {' '}with your name in the subject line.
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
