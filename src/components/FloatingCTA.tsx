import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <a
        href="tel:+353873694378"
        className="flex items-center gap-2.5 bg-primary text-black font-bold px-5 py-3.5 rounded-full shadow-xl shadow-primary/30"
        aria-label="Call WINGS Security now"
      >
        <Phone className="h-5 w-5" />
        <span className="text-sm">Call Now</span>
      </a>
    </div>
  );
};

export default FloatingCTA;
