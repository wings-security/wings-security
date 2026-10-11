import { useEffect, useRef } from 'react';
import type { JSX } from 'react';
import type { FormKind } from '../../../server/schema';

interface TurnstileAPI {
  render(element: HTMLElement, options: { sitekey: string; action: FormKind; size: 'compact' | 'flexible'; callback(token: string): void; 'expired-callback'(): void; 'error-callback'(): void }): string;
  remove(widget: string): void;
  reset(widget: string): void;
}
declare global { interface Window { turnstile?: TurnstileAPI } }
interface ChallengeProps { action: FormKind; reset: number; onToken(token: string | null): void; onError(message: string): void }

export default function TurnstileChallenge({ action, reset, onToken, onError }: ChallengeProps): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  useEffect((): (() => void) => {
    const sitekey: string | undefined = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (!sitekey) { onError('Security verification is not configured. Please contact WINGS.'); return (): void => {}; }
    let active: boolean = true;
    const initialise = (): void => {
      if (!active || !window.turnstile || !container.current || widget.current !== null) return;
      widget.current = window.turnstile.render(container.current, { sitekey, action,
        size: container.current.getBoundingClientRect().width < 300 ? 'compact' : 'flexible',
        callback: (token: string): void => { onError(''); onToken(token); },
        'expired-callback': (): void => { onToken(null); if (widget.current) window.turnstile?.reset(widget.current); },
        'error-callback': (): void => { onToken(null); onError('The security check could not load. Please reload or contact WINGS.'); },
      });
    };
    const failed = (): void => { onError('The security check could not load. Please reload or contact WINGS.'); };
    let script: HTMLScriptElement | null = document.querySelector('#wings-turnstile');
    if (!script) { script = document.createElement('script'); script.id = 'wings-turnstile'; script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; script.async = true; document.head.appendChild(script); }
    script.addEventListener('load', initialise);
    script.addEventListener('error', failed);
    initialise();
    return (): void => {
      active = false;
      script?.removeEventListener('load', initialise); script?.removeEventListener('error', failed);
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [action, onToken, onError]);
  useEffect((): void => { if (reset > 0 && widget.current) { onToken(null); window.turnstile?.reset(widget.current); } }, [reset, onToken]);
  return <div className="security-check"><p>Complete the security check before submitting.</p><div ref={container} /></div>;
}
