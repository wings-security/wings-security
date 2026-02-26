import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

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
            <p className="text-sm text-muted-foreground mt-1">Last updated: February 2026</p>
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
                <p className="text-muted-foreground text-sm">Full name, email address, phone number (optional), message content.</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium text-foreground text-sm mb-1">Careers Application Form</p>
                <p className="text-muted-foreground text-sm">Full name, email address, phone number, role applied for, CV/resume document.</p>
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
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Client contract data</strong> - retained for 7 years as required by Irish company law and Revenue requirements</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Form submissions are transmitted via Web3Forms, a GDPR-compliant service, using encrypted HTTPS connections.
              Data received via form submission is delivered directly to our secured business email at info@wingssecurity.ie,
              hosted on Google Workspace which is GDPR-compliant and ISO 27001 certified.
              We do not store form submission data in any database or third-party CRM beyond email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Your Rights Under GDPR</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You have the following rights regarding your personal data:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right of access</strong> - request a copy of the data we hold about you</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to rectification</strong> - request correction of inaccurate data</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to erasure</strong> - request deletion of your data ("right to be forgotten")</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to withdraw consent</strong> - at any time, without affecting prior processing</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to data portability</strong> - receive your data in a structured, machine-readable format</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Right to object</strong> - to processing based on legitimate interests</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:info@wingssecurity.ie" className="text-primary hover:underline">info@wingssecurity.ie</a>.
              We will respond within 30 days. If you are unsatisfied with our response, you have the right to lodge a
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
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Web3Forms</strong> (web3forms.com) - form submission processing. GDPR compliant. Data is transmitted but not stored by Web3Forms beyond delivery.</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Google Fonts</strong> - font delivery. IP address may be processed by Google.</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Google Maps</strong> - location embed on the contact page. Subject to Google's privacy policy.</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span><strong className="text-foreground">Vercel</strong> - website hosting. Standard server logs (IP, timestamp) are retained for up to 30 days.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">8. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. The "last updated" date at the top of this page
              will reflect any changes. Continued use of our website after changes constitutes acceptance of the
              updated policy.
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
