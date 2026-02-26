import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const TermsOfService = () => {
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
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mt-1">Last updated: February 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-foreground">

          <section>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your use of the wingssecurity.ie website and any
              services provided by WINGS Security Ltd. ("WINGS Security", "we", "us", "our").
              By accessing our website or engaging our services, you agree to these Terms.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              WINGS Security Ltd. is a company registered in Ireland (CRO: 772757), licensed by
              the Private Security Authority of Ireland (PSA Licence No. 14161), with registered address at
              Block 1, Blanchardstown Corporate Park, Ballycoolin Road, Dublin 15, D15 AKK1.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Use of This Website</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You agree to use this website only for lawful purposes and in a manner that does not:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Violate any applicable Irish or EU law or regulation</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Transmit any unsolicited or unauthorised advertising or promotional material</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Attempt to gain unauthorised access to any part of the website or its related systems</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Transmit any data that contains viruses, trojans, or other harmful code</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Misrepresent your identity or your organisation when submitting enquiries</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">2. Security Services - Engagement Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Submitting an enquiry or quote request via this website does not constitute a contract for services.
              A binding contract is only formed when both parties have agreed in writing (including by email) to
              specific service terms, scope, duration, and pricing.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">All security services provided by WINGS Security Ltd. are subject to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>A separate written service agreement or contract signed by both parties</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Compliance with the Private Security Services Act 2004 and all subsequent amendments</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>PSA licensing requirements for all personnel deployed</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Our standard insurance and indemnity terms as set out in the service agreement</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">3. Accuracy of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We make every effort to ensure that the information on this website is accurate and up to date.
              However, we do not warrant that the content is error-free, complete, or current. We reserve the
              right to modify or withdraw content at any time without notice. Nothing on this website constitutes
              legal, financial, or professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website including text, images, logos, graphics, and design is the property of
              WINGS Security Ltd. or its licensors and is protected by Irish and international copyright law.
              You may not reproduce, distribute, or use any content from this website without our prior written
              permission, except for personal, non-commercial viewing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              To the fullest extent permitted by Irish law, WINGS Security Ltd. will not be liable for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Any indirect, consequential, or incidental loss arising from your use of this website</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Loss of data, revenue, or profits resulting from website downtime or technical errors</span></li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Third-party websites linked from this site - we are not responsible for their content or practices</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Nothing in these Terms limits our liability for death, personal injury caused by our negligence,
              or any liability that cannot be excluded under applicable Irish law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Links to Third-Party Websites</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website may contain links to third-party websites including LinkedIn, Instagram, Facebook,
              and Google Maps. These links are provided for convenience only. We have no control over the content
              or privacy practices of those sites and accept no responsibility for them. Visiting linked sites
              is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">7. Privacy and Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your use of this website is also governed by our{' '}
              <button
                onClick={() => window.location.href = '/privacy-policy'}
                className="text-primary hover:underline"
              >
                Privacy Policy
              </button>
              , which forms part of these Terms. By using this website, you consent to the processing of your
              personal data as described in the Privacy Policy, in accordance with the GDPR and the Data
              Protection Acts 1988-2018.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of Ireland. Any disputes
              arising from these Terms or your use of this website will be subject to the exclusive jurisdiction
              of the Irish courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">9. Complaints and PSA Regulation</h2>
            <p className="text-muted-foreground leading-relaxed">
              WINGS Security Ltd. is licensed and regulated by the Private Security Authority of Ireland
              (PSA Licence No. 14161). If you have a complaint regarding our security services that we have
              been unable to resolve directly, you may contact the PSA at{' '}
              <a href="https://www.psa.gov.ie" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                psa.gov.ie
              </a>.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To raise a complaint directly with us, email{' '}
              <a href="mailto:info@wingssecurity.ie" className="text-primary hover:underline">info@wingssecurity.ie</a>{' '}
              with the subject line "Complaint". We will acknowledge within 5 working days and aim to resolve
              within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">10. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update these Terms at any time. The "last updated" date at the top of this
              page reflects the most recent version. Continued use of the website after changes are posted
              constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">11. Contact</h2>
            <div className="bg-muted/50 rounded-lg p-4 space-y-1 text-sm text-muted-foreground">
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

export default TermsOfService;
