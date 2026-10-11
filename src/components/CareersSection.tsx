import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, JSX } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { formText, recordApplication, submissionError, submitEnquiry } from '@/lib/submissions';
import { pdfForSubmission, submitSecureForm, usesServerForms } from '@/lib/secure-submissions';
import TurnstileChallenge from '@/components/site/TurnstileChallenge';

export default function CareersSection(): JSX.Element {
  const prefix: string = useId();
  const [ready, setReady] = useState<boolean>(false);
  useEffect((): void => { setReady(true); }, []);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [trackingWarning, setTrackingWarning] = useState<boolean>(false);
  const [cvReceived, setCvReceived] = useState<boolean>(false);
  const [applicant, setApplicant] = useState<string>('');
  const busy = useRef<boolean>(false);
  const secure: boolean = usesServerForms('careers');
  const requestId = useRef<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [spamError, setSpamError] = useState<string>('');
  const [challengeReset, setChallengeReset] = useState<number>(0);
  const [leadId, setLeadId] = useState<string>('');
  const cvEmail: string = `mailto:info@wingssecurity.ie?subject=${encodeURIComponent('CV Application - ' + applicant + ' - WINGS Security')}`;
  const validateFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const input: HTMLInputElement = event.currentTarget;
    const file: File | undefined = input.files?.[0];
    input.setCustomValidity('');
    setError('');
    if (file && (!(secure ? /\.pdf$/i : /\.(pdf|doc|docx)$/i).test(file.name) || file.size > (secure ? 3 : 5) * 1024 * 1024 || file.size === 0)) {
      input.value = '';
      setError(secure ? 'Choose a non-empty PDF up to 3 MB, or email your CV.' : 'Choose a non-empty PDF, DOC or DOCX file up to 5 MB, or leave the upload empty and email your CV.');
    }
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (busy.current) return;
    const form: HTMLFormElement = event.currentTarget;
    const data: FormData = new FormData(form);
    if (formText(data, 'website')) { setError('Please leave the website field empty.'); setStatus('error'); return; }
    if (!formText(data, 'fullName')) { setError('Please enter your name.'); setStatus('error'); return; }
    if (data.get('consent') !== 'on') { setError('Please confirm the privacy notice before submitting.'); setStatus('error'); return; }
    const entry: FormDataEntryValue | null = data.get('attachment');
    const file: File | null = entry instanceof File && entry.size > 0 ? entry : null;
    if (file && (!/\.(pdf|doc|docx)$/i.test(file.name) || file.size > 5 * 1024 * 1024)) { setError('The CV must be a PDF, DOC or DOCX up to 5 MB.'); setStatus('error'); return; }
    busy.current = true;
    setStatus('sending');
    setError('');
    const name: string = formText(data, 'fullName');
    const email: string = formText(data, 'email');
    const phone: string = formText(data, 'phone');
    const role: string = formText(data, 'role');
    try {
      if (secure) {
        if (!token) throw new Error('Complete the security check first.');
        if (!requestId.current) requestId.current = crypto.randomUUID();
        const receipt = await submitSecureForm({ kind: 'careers', requestId: requestId.current, token, sourcePage: window.location.pathname, consent: true, website: '',
          data: { name, email, phone, county: formText(data, 'county'), role: role as 'Static Security Guard' | 'Event Security Guard' | 'Reception Security' | 'Other', cv: await pdfForSubmission(file) } });
        if (file && !receipt.cvStored) throw new Error('CV storage was not confirmed. Keep this page open and contact WINGS before submitting again.');
        setLeadId(receipt.leadId);
        requestId.current = '';
      } else {
      await submitEnquiry({ subject: `New Job Application - ${role} - WINGS Security`, from_name: name, email, phone, role_applying_for: role, county: formText(data, 'county'), message: `Role: ${role}. County: ${formText(data, 'county')}. CV: ${file ? 'attached' : 'to follow by email'}.`, gdpr_consent: 'Yes', botcheck: '' }, file);
      }
      setApplicant(name);
      setCvReceived(file !== null);
      setStatus('success');
      form.reset();
      if (!secure) try {
        await recordApplication({ name, email, phone, role, source: 'Careers Form - wingssecurity.ie' });
      } catch (trackingError: unknown) {
        console.warn('Application email sent; tracking update not confirmed', { detail: submissionError(trackingError) });
        setTrackingWarning(true);
      }
    } catch (caught: unknown) {
      const detail: string = submissionError(caught);
      console.error('Application delivery failed', { endpoint: secure ? 'Vercel forms' : 'Web3Forms', detail });
      setError(detail + (file ? ' If uploads are unavailable, remove the attachment, submit your details, and email your CV separately.' : ' You can email your application to info@wingssecurity.ie.'));
      setStatus('error');
    } finally { busy.current = false; if (secure) setChallengeReset((value: number): number => value + 1); }
  };
  if (status === 'success') return <div className="form-success" role="status"><CheckCircle2 size={40} /><h2>Application received.</h2>{leadId && <p>Reference: <strong>{leadId}</strong></p>}<p>{cvReceived ? secure ? 'Your application and CV have been saved securely.' : 'Your application and attached CV were accepted by the form service.' : 'One more step: please email your CV to info@wingssecurity.ie.'}</p><p>Our team reviews applications during office hours. An application does not guarantee a role or shift.</p>{trackingWarning && <p>The additional tracking update could not be confirmed. Your email submission succeeded; please do not submit it again.</p>}<a className="button button-dark" href={cvEmail}>Email your CV <ArrowUpRight size={18} /></a></div>;
  return <form id="application" className="enquiry-form" method="post" onSubmit={onSubmit} aria-busy={status === 'sending'}>
    <p className="eyebrow">REGISTER YOUR INTEREST</p><h2>Apply to WINGS.</h2><p className="form-intro">Required fields are marked *. Please do not upload identity documents or licence scans here.</p>
    <div className="honeypot" aria-hidden="true"><label htmlFor={prefix + 'website'}>Leave this empty</label><input id={prefix + 'website'} name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="form-grid">
      <div className="field"><label htmlFor={prefix + 'name'}>Full name *</label><input id={prefix + 'name'} name="fullName" required maxLength={120} autoComplete="name" /></div>
      <div className="field"><label htmlFor={prefix + 'email'}>Email address *</label><input id={prefix + 'email'} type="email" name="email" required maxLength={254} autoComplete="email" /></div>
      <div className="field"><label htmlFor={prefix + 'phone'}>Phone number *</label><input id={prefix + 'phone'} name="phone" type="tel" required maxLength={40} autoComplete="tel" /></div>
      <div className="field"><label htmlFor={prefix + 'county'}>County *</label><input id={prefix + 'county'} name="county" required maxLength={100} autoComplete="address-level1" /></div>
      <div className="field field-full"><label htmlFor={prefix + 'role'}>Role of interest *</label><select id={prefix + 'role'} name="role" defaultValue="" required><option value="" disabled>Select a role</option><option>Static Security Guard</option><option>Event Security Guard</option><option>Reception Security</option><option>Other</option></select></div>
      <div className="field field-full"><label htmlFor={prefix + 'cv'}>CV (optional upload)</label><input id={prefix + 'cv'} type="file" name="attachment" accept={secure ? '.pdf' : '.pdf,.doc,.docx'} onChange={validateFile} aria-describedby={prefix + 'cv-help'} /><small id={prefix + 'cv-help'}>{secure ? 'PDF, up to 3 MB. Stored in restricted recruitment storage.' : 'PDF, DOC or DOCX, up to 5 MB.'} Alternatively, submit your details and email your CV.</small></div>
    </div>
    <div className="consent-row"><input id={prefix + 'consent'} name="consent" type="checkbox" required /><label htmlFor={prefix + 'consent'}>I consent to WINGS processing my application as described in the <Link to="/privacy-policy">Privacy Policy</Link>. *</label></div>
    {secure && <TurnstileChallenge action="careers" reset={challengeReset} onToken={setToken} onError={setSpamError} />}
    {spamError && <p className="form-error" role="alert">{spamError}</p>}
    {error && <div className="form-error" role="alert"><p>{error}</p></div>}
    <noscript><p className="form-error">Enable JavaScript to send this form, or email your application to info@wingssecurity.ie.</p></noscript>
    <button type="submit" className="button button-green form-submit" disabled={!ready || status === 'sending' || secure && !token}>{status === 'sending' ? <><Loader2 className="spin" size={18} /> Sending application...</> : <>Submit application <ArrowUpRight size={19} /></>}</button>
    <div className="cv-note"><strong>Prefer to email your CV?</strong><p>Send it to <a href="mailto:info@wingssecurity.ie?subject=CV%20Application%20-%20WINGS%20Security">info@wingssecurity.ie</a> with your name and preferred role in the subject line. If you uploaded it successfully, you do not need to send it twice.</p></div>
  </form>;
}
