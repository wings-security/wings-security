import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Linkedin, Instagram, Facebook } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
    { label: 'Contact', id: 'contact' },
    { label: 'IRIS (Coming Soon)', id: 'services' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isScrolled 
          ? 'glass-nav shadow-wings-glass opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img 
              src="/lovable-uploads/117082b5-15cf-4310-a07a-0e0a6ed01dd5.png" 
              alt="WINGS Security logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="btn-wings-ghost text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social Media and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
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
            <Button 
              onClick={() => scrollToSection('contact')}
              className="btn-wings-primary font-bold"
            >
              Request a Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
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
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-wings-primary w-full font-bold"
                >
                  Request a Free Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;