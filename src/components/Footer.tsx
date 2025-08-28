import { Shield, Mail, MapPin, Clock, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';


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
                  src="/assets/wings-logo.png" 
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
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
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

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Services', id: 'services' },
                  { label: 'About Us', id: 'about' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Contact', id: 'contact' }
                ].map((link) => (
                  link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-white/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                  )
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
                  'IRIS Remote Guarding (Coming Soon)'
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
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left - Copyright */}
            <div className="text-center md:text-left">
              <div className="text-white font-medium text-sm mb-1">
                © 2025 WINGS Security Ltd.
              </div>
              <div className="text-white/70 text-xs">
                Professional, licensed, and insured security services across Ireland.
              </div>
            </div>
            
            {/* Middle - Navigation Links */}
            <div className="flex flex-wrap justify-center items-center space-x-4 text-xs text-white/60">
              <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Home</button>
              <span>•</span>
              <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Services</button>
              <span>•</span>
              <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About Us</button>
              <span>•</span>
              <a href="/careers" className="hover:text-primary transition-colors">Careers</a>
              <span>•</span>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact Us</button>
              <span>•</span>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Terms</button>
            </div>
            
            {/* Right - Compliance Info */}
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end mb-2">
                <img 
                  src="/lovable-uploads/eac190f7-5b85-4894-8bf0-136c102d125f.png" 
                  alt="PSA Licensed" 
                  className="h-5 w-auto mr-2"
                />
                <span className="text-white/90 text-xs font-medium">PSA Licence: 14161</span>
              </div>
              <div className="text-white/70 text-xs space-y-1">
                <div>CRO: 772757</div>
                <div>Fully Insured & GDPR Compliant</div>
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Trusted by Irish Businesses Nationwide</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legal Disclaimer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-xs text-white/60">
              WINGS Security Ltd is licensed by the Private Security Authority (Licence No. 14161) and fully insured to operate in Ireland.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
            </div>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;