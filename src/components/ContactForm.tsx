import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, JSX } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { enquiryTypes, publicPaths, sectors } from '@/data/site';
import { formText, submissionError, submitEnquiry } from '@/lib/submissions';
import { submitSecureForm, usesServerForms } from '@/lib/secure-submissions';
import TurnstileChallenge from '@/components/site/TurnstileChallenge';

export default function ContactForm(): JSX.Element {
  const prefix: string = useId();
  const [params] = useSearchParams();
  const requested: string | null = params.get('service');
  const sector: string = sectors.find((item) => item.slug === params.get('sector'))?.title || '';
  const initial: string = requested && enquiryTypes.includes(requested) ? requested : 'General enquiry';
  const source: string | null = params.get('source');
  const [service, setService] = useState<string>('General enquiry');
  const [ready, setReady] = useState<boolean>(false);
  useEffect((): void => { setReady(true); }, []);
  useEffect((): void => { setService(initial); }, [initial]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const busy = useRef<boolean>(false);
  const secure: boolean = usesServerForms('sales');
  const requestId = useRef<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [spamError, setSpamError] = useState<string>('');
  const [challengeReset, setChallengeReset] = useState<number>(0);
  const [leadId, setLeadId] = useState<string>('');
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (busy.current) return;
    const form: HTMLFormElement = event.currentTarget;
    const data: FormData = new FormData(form);
    if (formText(data, 'website')) { setError('Please leave the website field empty.'); setStatus('error'); return; }
    if (!formText(data, 'fullName') || !formText(data, 'message')) { setError('Please enter your name and a message, not just spaces.'); setStatus('error'); return; }
    if (data.get('consent') !== 'on') { setError('Please confirm the privacy notice before submitting.'); setStatus('error'); return; }
    busy.current = true;
    setStatus('sending');
    setError('');
    try {
      if (secure) {
        if (!token) throw new Error('Complete the security check first.');
        if (!requestId.current) requestId.current = crypto.randomUUID();
        const receipt = await submitSecureForm({ kind: 'sales', requestId: requestId.current, token, sourcePage: source && publicPaths.includes(source) ? source : window.location.pathname, consent: true, website: '',
          data: { name: formText(data, 'fullName'), email: formText(data, 'email'), phone: formText(data, 'phone'), company: formText(data, 'company'), service: formText(data, 'service'), sector,
            location: formText(data, 'location'), startDate: formText(data, 'startDate'), message: formText(data, 'message') } });
        setLeadId(receipt.leadId);
        requestId.current = '';
      } else {
      await submitEnquiry({
        subject: `New ${formText(data, 'service')} - WINGS Security`,
        from_name: formText(data, 'fullName'), email: formText(data, 'email'),
        phone: formText(data, 'phone'), company: formText(data, 'company'),
        enquiry_type: formText(data, 'service'), sector, location: formText(data, 'location'),
        start_date: formText(data, 'startDate'), message: formText(data, 'message'),
        gdpr_consent: data.get('consent') === 'on' ? 'Yes' : 'No', botcheck: '',
      }, null);
      }
      setStatus('success');
      form.reset();
    } catch (caught: unknown) {
      const detail: string = submissionError(caught);
      console.error('Enquiry delivery failed', { endpoint: secure ? 'Vercel forms' : 'Web3Forms', detail });
      setError(detail);
      setStatus('error');
    } finally { busy.current = false; if (secure) setChallengeReset((value: number): number => value + 1); }
  };
  if (status === 'success') return <div className="form-success" role="status"><CheckCircle2 size={40} /><h2>{secure ? 'Your enquiry has been saved.' : 'Your enquiry has been sent.'}</h2>{leadId && <p>Reference: <strong>{leadId}</strong></p>}<p>Our team will review it during office hours: Monday to Friday, 09:00-17:00. Your enquiry is not a confirmed booking.</p><p>For contact outside office hours, call or WhatsApp +353 87 369 4378.</p><button className="button button-dark" onClick={(): void => setStatus('idle')}>Send another enquiry</button></div>;
  return <form className="enquiry-form" method="post" onSubmit={onSubmit} aria-busy={status === 'sending'}>
    <p className="eyebrow">YOUR REQUIREMENTS</p><h2>Let's get the details.</h2><p className="form-intro">Required fields are marked *. Looking for work? <Link to="/careers">Apply here instead.</Link></p>{sector && <p className="enquiry-context">Your sector: <strong>{sector}</strong></p>}
    <div className="honeypot" aria-hidden="true"><label htmlFor={prefix + 'website'}>Leave this empty</label><input id={prefix + 'website'} name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="form-grid">
      <div className="field"><label htmlFor={prefix + 'name'}>Full name *</label><input id={prefix + 'name'} name="fullName" required autoComplete="name" maxLength={120} placeholder="Your full name" /></div>
      <div className="field"><label htmlFor={prefix + 'email'}>Email address *</label><input id={prefix + 'email'} name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@company.ie" /></div>
      <div className="field"><label htmlFor={prefix + 'company'}>Company (optional)</label><input id={prefix + 'company'} name="company" autoComplete="organization" maxLength={180} placeholder="Company or organisation" /></div>
      <div className="field"><label htmlFor={prefix + 'phone'}>Phone number (optional)</label><input id={prefix + 'phone'} name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Your contact number" /></div>
      <div className="field field-full"><label htmlFor={prefix + 'service'}>How can we help? *</label><select id={prefix + 'service'} name="service" value={service} onChange={(event): void => setService(event.currentTarget.value)} required>{enquiryTypes.map((type: string) => <option key={type}>{type}</option>)}</select></div>
      <div className="field"><label htmlFor={prefix + 'location'}>Site / event location (optional)</label><input id={prefix + 'location'} name="location" maxLength={200} placeholder="Town or county" /></div>
      <div className="field"><label htmlFor={prefix + 'date'}>Preferred start date (optional)</label><input id={prefix + 'date'} name="startDate" type="date" /></div>
      <div className="field field-full"><label htmlFor={prefix + 'message'}>Tell us what you need *</label><textarea id={prefix + 'message'} name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Dates, hours and the duties you need covered. Please don't include access codes or sensitive site information." /></div>
    </div>
    <div className="consent-row"><input id={prefix + 'consent'} name="consent" type="checkbox" required /><label htmlFor={prefix + 'consent'}>I agree to WINGS using my details to respond to this enquiry, as described in the <Link to="/privacy-policy">Privacy Policy</Link>. *</label></div>
    {secure && <TurnstileChallenge action="sales" reset={challengeReset} onToken={setToken} onError={setSpamError} />}
    {spamError && <p className="form-error" role="alert">{spamError}</p>}
    {status === 'error' && <div role="alert" className="form-error"><strong>Your enquiry has not been confirmed.</strong><p>{error}</p><p>Your details are still here. You can try again or email info@wingssecurity.ie.</p></div>}
    <noscript><p className="form-error">Enable JavaScript to send this form, or email info@wingssecurity.ie.</p></noscript>
    <button className="button button-green form-submit" type="submit" disabled={!ready || status === 'sending' || secure && !token}>{status === 'sending' ? <><Loader2 className="spin" size={18} /> Sending enquiry...</> : <>Send enquiry <ArrowUpRight size={19} /></>}</button><p className="form-footnote">No obligation. Scope and availability are confirmed before booking.</p>
  </form>;
}
