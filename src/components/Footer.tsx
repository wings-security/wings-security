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
                  { label: 'Careers', id: 'careers' },
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

          {/* Final Footer Line */}
          <div className="border-t border-white/10 pt-6 mt-12">
            <div className="text-center text-sm text-white/70 space-y-2">
              <div>
                © 2025 <strong className="text-white">WINGS Security Ltd</strong> · Licensed by the <strong className="text-white">Private Security Authority</strong> (Licence No. 14161) · CRO: 772757 · Fully Insured · GDPR Compliant · Trusted by Irish Businesses Nationwide
              </div>
              <div className="text-xs space-x-2">
                <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
                <span>·</span>
                <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
                <span>·</span>
                <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Secure & Trusted</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;