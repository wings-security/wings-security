import { Shield, Mail, MapPin, Clock, Phone, Linkedin } from 'lucide-react';
import wingsLogo from '@/assets/wings-logo-official.png';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wings-black text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img 
                  src={wingsLogo} 
                  alt="WINGS Security Ltd." 
                  className="h-12 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Professional insured security services across Ireland with cutting-edge technology 
                and experienced personnel protecting what matters most.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-white/70">Fully Insured</span>
                </div>
                <a 
                  href="https://www.linkedin.com/company/wings-security-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-wings-grey-dark/20 hover:bg-primary/10 transition-colors group"
                >
                  <Linkedin className="h-5 w-5 text-wings-grey group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Services', id: 'services' },
                  { label: 'About Us', id: 'about' },
                  { label: 'Contact', id: 'contact' }
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

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold">Our Services</h3>
              <div className="space-y-3">
                {[
                  'Static Guarding',
                  'Event Stewarding / Static Event Guards',
                  'IRIS Remote Guarding',
                  'Security Consultation',
                  'Risk Assessment'
                ].map((service) => (
                  <div key={service} className="text-white/70 text-sm">
                    {service}
                    {service === 'IRIS Remote Guarding' && (
                      <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
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
                      href="tel:+353899899484" 
                      className="text-white/70 hover:text-primary transition-colors text-sm"
                    >
                      +353 899899484
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-white/70 text-sm">
                      Block 1, Blanchardstown Corporate Park<br />
                      Ballycoolin Road, Dublin 15, D15 AKK1<br />
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

          {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <div className="text-white/60 text-sm">
                © {currentYear} WINGS Security Ltd. All rights reserved.
              </div>
              <div className="text-white/40 text-xs mt-1">
                WINGS Security is fully insured and operating under licensing application review (expected approval within weeks).
              </div>
            </div>
              
              <div className="flex items-center space-x-6 text-sm text-white/60">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Secure & Trusted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;