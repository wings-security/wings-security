import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Linkedin, Instagram, Facebook, Phone } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setIsMobileMenuOpen(false);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Careers', id: 'careers' },
    { label: 'Contact', id: 'contact' },
  ];
  const desktopNavText = scrolled ? 'text-foreground' : 'text-white/90';
  const desktopContactText = scrolled ? 'text-foreground' : 'text-white/90';
  const mobileIconText = scrolled ? 'text-foreground' : 'text-white';
  const navBackground = scrolled ? 'bg-background/95 shadow-lg backdrop-blur-xl' : 'bg-black/70 backdrop-blur-md';

  return (
    <header className="sticky top-0 z-50">
      <div className="w-full overflow-hidden">
        {announcementVisible && (
          <div className="bg-primary text-black text-sm font-medium py-2 px-4">
            <div className="container mx-auto flex items-center justify-center gap-6 relative">
              <span className="text-center">
                PSA Licensed Security - Free Consultation - Email{' '}
                <a href="mailto:info@wingssecurity.ie" className="font-bold underline">
                  info@wingssecurity.ie
                </a>
              </span>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="absolute right-0 text-black/60 hover:text-black transition-colors"
                aria-label="Dismiss announcement"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className={`transition-all duration-300 ${navBackground}`}>
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <img
                src="/lovable-uploads/117082b5-15cf-4310-a07a-0e0a6ed01dd5.png"
                alt="WINGS Security logo"
                className="h-12 w-auto"
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`btn-wings-ghost text-sm font-medium transition-colors hover:text-primary ${desktopNavText}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="hidden xl:flex items-center space-x-2">
                <a
                  href="https://www.linkedin.com/company/wings-security-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/wings_security?igsh=NmZod2pqNHhocjJn&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579733607665"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
              </div>

              <a
                href="tel:+353873694378"
                className={`hidden lg:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${desktopContactText}`}
              >
                <Phone className="h-4 w-4" />
                +353 87 369 4378
              </a>

              <Button onClick={() => scrollToSection('contact')} className="btn-wings-primary font-bold">
                Get a Quote
              </Button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className={`h-6 w-6 ${mobileIconText}`} /> : <Menu className={`h-6 w-6 ${mobileIconText}`} />}
            </button>
          </nav>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border bg-background/95 backdrop-blur-md rounded-lg">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="btn-wings-ghost text-left py-3 px-4 text-foreground hover:text-primary"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 pt-2 space-y-3">
                  <a href="tel:+353873694378" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    +353 87 369 4378
                  </a>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/company/wings-security-limited/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                    </a>
                    <a
                      href="https://www.instagram.com/wings_security?igsh=NmZod2pqNHhocjJn&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-primary" />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61579733607665"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-primary" />
                    </a>
                  </div>
                  <Button onClick={() => scrollToSection('contact')} className="btn-wings-primary w-full font-bold">
                    Request a Free Quote
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
