import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { usesServerForms } from '@/lib/secure-submissions';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const serverForms: boolean = usesServerForms('sales') || usesServerForms('careers');
  const legacyForms: boolean = !usesServerForms('sales') || !usesServerForms('careers');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <div className="bg-wings-black py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <img
            src="/lovable-uploads/117082b5-15cf-4310-a07a-0e0a6ed01dd5.png"
            alt="WINGS Security"
            className="h-9 w-auto"
          />
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mt-1">Last updated: October 2026</p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-foreground">

          <section>
            <p className="text-muted-foreground leading-relaxed">
              WINGS Security Ltd. ("WINGS Security", "we", "us", "our") is committed to protecting your personal data.
              This Privacy Policy explains how we collect, use, store, and protect your information when you use our
              website at wingssecurity.ie or contact us about our services.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We are a data controller registered in Ireland. CRO: 772757. PSA Licence No. 14161.
              Our registered address is Block 1, Blanchardstown Corporate Park, Ballycoolin Road, Dublin 15, D15 AKK1.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We collect personal data only when you voluntarily provide it to us through our website forms:
            </p>
            <div className="space-y-3">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium text-foreground text-sm mb-1">Contact / Quote Enquiry Form</p>
                <p className="text-muted-foreground text-sm">Full name, email address, enquiry type and message; optionally your phone number, company, location and preferred start date.</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium text-foreground text-sm mb-1">Careers Application Form</p>
                <p className="text-muted-foreground text-sm">Full name, email address, phone number, county and role applied for; your CV if uploaded or emailed separately.</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not use cookies beyond what is technically required to serve the website. We do not use tracking
              pixels, advertising cookies, or third-party analytics that collect personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">2. How We Use Your Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use your data strictly for the following purposes:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>To respond to your security service enquiry or quote request</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>To process and review your job application</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>To fulfil any contract we enter into with you</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>To comply with our legal obligations as a PSA-licensed company</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We do not sell, rent, or share your personal data with third parties for marketing purposes. We will never
              send you unsolicited marketing communications unless you have explicitly opted in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">3. Legal Basis for Processing (GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Under the General Data Protection Regulation (GDPR) and the Data Protection Acts 1988-2018, our legal
              bases for processing your data are:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Consent</strong> - you tick the GDPR consent box before submitting any form on our website</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Contractual necessity</strong> - to deliver services you have requested</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Legal obligation</strong> - where we are required to process data under Irish or EU law</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Legitimate interests</strong> - for responding to general business enquiries</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">4. Data Retention</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Enquiry and contact data</strong> - retained for 12 months from the date of contact, then securely deleted unless a contract is formed</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Job applications</strong> - retained for 6 months from the date of application, then securely deleted unless employment commences</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Client contract data</strong> - our retention period is 7 years, subject to applicable legal obligations and any ongoing claims</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Form submissions are transmitted to Web3Forms using HTTPS for delivery to our business email.
              Following a successful careers submission, applicant contact details and the role applied for
              are also sent to our Google Apps Script application-tracking endpoint. The CV is not included
              in that tracking request. Please do not submit identity documents, licence scans, access codes
              or other sensitive information through the public forms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Your Rights Under GDPR</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Subject to the conditions and exceptions in the GDPR, you have the following rights regarding your personal data:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right of access</strong> - request a copy of the data we hold about you</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to rectification</strong> - request correction of inaccurate data</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to erasure</strong> - request deletion of your data ("right to be forgotten")</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to restriction</strong> - request that we limit processing in the circumstances set out in Article 18</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to withdraw consent</strong> - at any time, without affecting prior processing</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to data portability</strong> - receive your data in a structured, machine-readable format</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to object</strong> - to processing based on legitimate interests</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:info@wingssecurity.ie" className="text-primary hover:underline">info@wingssecurity.ie</a>.
              We will respond within one month; where a lawful extension is needed, we will explain it within that month.
              If you are unsatisfied with our response, you have the right to lodge a
              complaint with the Data Protection Commission of Ireland at{' '}
              <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dataprotection.ie</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">7. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Our website uses the following third-party services, each with their own privacy policies:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {legacyForms && <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Web3Forms</strong> (web3forms.com) - processing enquiries, applications and optional CV attachments for email delivery on forms that still use this integration.</span></li>}
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">{serverForms ? 'Google Workspace (Sheets, Drive and Apps Script)' : 'Google Apps Script'}</strong> - {serverForms ? 'restricted enquiry and recruitment tracking, duplicate protection and private CV storage. Sales and recruitment records are kept separately.' : 'recording careers contact details and the role applied for in our application-tracking workflow.'}</span></li>
              {serverForms && <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Cloudflare Turnstile</strong> - checks for automated spam. Technical information, including IP address and browser signals, may be processed for this security check.</span></li>}
              {serverForms && <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Resend</strong> - delivery of internal notification emails containing a submission reference and service or role, rather than the CV or full enquiry content.</span></li>}
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Google Fonts</strong> - font delivery. IP address may be processed by Google.</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Google Maps and WhatsApp</strong> - external links which open those services when selected, subject to their own privacy policies. The optional interactive map loads from Google only after you select it.</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Vercel</strong> - website hosting and technical request logs.</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">For specialist-service enquiries, we may share the necessary project and contact details with the relevant delivery provider to scope or arrange the requested service. Contact us for information about recipients and any international transfers relevant to your enquiry.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">8. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. The "last updated" date at the top of this page
              will reflect any changes. A policy update does not itself provide consent to a new use of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any data protection queries or to exercise your rights, contact us at:
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mt-3 space-y-1 text-sm text-muted-foreground">
              <p><strong className="text-foreground">WINGS Security Ltd.</strong></p>
              <p>Block 1, Blanchardstown Corporate Park, Ballycoolin Road, Dublin 15, D15 AKK1</p>
              <p>Email: <a href="mailto:info@wingssecurity.ie" className="text-primary hover:underline">info@wingssecurity.ie</a></p>
              <p>Phone: <a href="tel:+353873694378" className="text-primary hover:underline">+353 87 369 4378</a></p>
              <p>CRO: 772757 | PSA Licence No. 14161</p>
            </div>
          </section>

        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-wings-black py-6 px-6 text-center">
        <p className="text-white/40 text-xs">
          WINGS Security Ltd. | PSA Licence No. 14161 | CRO: 772757 | Regulated by the Private Security Authority of Ireland
        </p>
        <button
          onClick={() => navigate('/')}
          className="text-primary text-sm hover:underline mt-2 block mx-auto"
        >
          Back to wingssecurity.ie
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
