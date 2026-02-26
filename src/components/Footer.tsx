import { ArrowRight, Mail, MapPin, Clock, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wings-black text-white pt-0 pb-8">
      <div className="bg-primary/10 border-t border-primary/20 py-10 mb-0">
        <div className="container mx-auto px-6 text-center space-y-4">
          <h3 className="text-2xl font-display font-bold text-white">Ready to secure your business?</h3>
          <p className="text-white/70">Get a free, no-obligation quote within 24 hours.</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-wings-primary font-bold inline-flex items-center gap-2"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  src="/lovable-uploads/117082b5-15cf-4310-a07a-0e0a6ed01dd5.png"
                  alt="WINGS Security green logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Professional insured security services across Ireland with cutting-edge technology
                and experienced personnel protecting what matters most.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-white/70">Fully Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://www.linkedin.com/company/wings-security-limited/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-wings-grey-dark/20 hover:bg-primary/10 transition-colors group"
                  >
                    <Linkedin className="h-5 w-5 text-wings-grey group-hover:text-primary transition-colors" />
                  </a>
                  <a
                    href="https://www.instagram.com/wings_security?igsh=NmZod2pqNHhocjJn&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-wings-grey-dark/20 hover:bg-primary/10 transition-colors group"
                  >
                    <Instagram className="h-5 w-5 text-wings-grey group-hover:text-primary transition-colors" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61579733607665"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-wings-grey-dark/20 hover:bg-primary/10 transition-colors group"
                  >
                    <Facebook className="h-5 w-5 text-wings-grey group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Services', id: 'services' },
                  { label: 'About Us', id: 'about' },
                  { label: 'Careers', id: 'careers' },
                  { label: 'Contact', id: 'contact' },
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold">Our Services</h3>
              <div className="space-y-3">
                {[
                  'Static Guarding',
                  'Event Stewarding / Static Event Guards',
                  'IRIS Remote Guarding (Coming Soon)',
                ].map((service) => (
                  <div key={service} className="text-white/70 text-sm">
                    {service}
                    {service.includes('IRIS Remote Guarding') && (
                      <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <a
                      href="mailto:info@wingssecurity.ie"
                      className="text-white/70 hover:text-primary transition-colors text-sm"
                    >
                      info@wingssecurity.ie
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <a
                      href="tel:+353873694378"
                      className="text-white/70 hover:text-primary transition-colors text-sm"
                    >
                      +353 87 369 4378
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-white/70 text-sm">
                      Block 1, Blanchardstown Corporate Park
                      <br />
                      Ballycoolin Road, Dublin 15, D15 AKK1
                      <br />
                      Headquartered in Dublin, operating nationwide
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Response Time</div>
                    <div className="text-white/70 text-sm">24 Hour Quote Turnaround</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-12">
            <p className="text-center text-sm text-white/70">
              © {currentYear} <strong className="text-white">WINGS Security Ltd</strong> | PSA Licence No. 14161 | CRO: 772757 | Regulated by the Private Security Authority of Ireland
            </p>
            <div className="text-center text-xs text-white/50 mt-3 space-x-2">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
