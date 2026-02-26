import { useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Is WINGS Security PSA licensed in Ireland?',
    a: 'Yes. WINGS Security Ltd. holds PSA Licence No. 14161, issued by the Private Security Authority of Ireland. All security officers are fully licensed, vetted, and PSA-compliant. Our CRO number is 772757.',
  },
  {
    q: 'What areas of Ireland do you cover?',
    a: 'We provide security services across all of Ireland. Our headquarters is in Dublin 15 (Blanchardstown Corporate Park). We cover Dublin, Leinster, and deploy nationally for contracts of all sizes.',
  },
  {
    q: 'How quickly can you deploy security personnel?',
    a: 'For most static guarding requirements we provide a quote within 48 hours and can deploy within a week. For urgent requirements, call us directly on +353 87 369 4378.',
  },
  {
    q: 'Do you provide security guards for events?',
    a: 'Yes. We provide fully licensed event stewarding and static event guards for events of all sizes - corporate functions, concerts, festivals, and public events across Ireland.',
  },
  {
    q: 'Are your security officers fully insured?',
    a: 'Yes. All WINGS Security personnel are fully insured. We carry public liability insurance and all officers operate under our PSA-licensed company umbrella.',
  },
  {
    q: 'What is the difference between static guarding and event security?',
    a: 'Static guarding means permanently stationed officers at a fixed location such as a retail store, office, or construction site. Event security involves deploying trained stewards and guards to manage crowd safety, access control, and incident response at events.',
  },
  {
    q: 'How do I get a security quote?',
    a: 'Use the contact form on this page, email info@wingssecurity.ie, WhatsApp us, or call +353 87 369 4378. We respond to all enquiries within 24 hours.',
  },
];

const FAQSection = () => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'faq-schema';
    if (!document.getElementById('faq-schema')) {
      document.head.appendChild(script);
    }
    return () => {
      document.getElementById('faq-schema')?.remove();
    };
  }, []);

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
              <HelpCircle className="h-4 w-4" />
              <span>FAQs</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about our security services in Ireland.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card border border-white/20 rounded-xl px-6">
                <AccordionTrigger className="font-display font-semibold text-left hover:text-primary transition-colors py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
