import { Building2, Briefcase, HardHat, Music2, Heart, GraduationCap, UtensilsCrossed, Warehouse } from 'lucide-react';

const industries = [
  { icon: Building2, label: 'Retail & Shopping Centres' },
  { icon: Briefcase, label: 'Corporate Offices' },
  { icon: HardHat, label: 'Construction Sites' },
  { icon: Music2, label: 'Events & Festivals' },
  { icon: Heart, label: 'Healthcare Facilities' },
  { icon: GraduationCap, label: 'Educational Institutions' },
  { icon: UtensilsCrossed, label: 'Hospitality & Hotels' },
  { icon: Warehouse, label: 'Industrial & Warehouses' },
];

const TrustedIndustries = () => (
  <section id="industries" className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
            <Building2 className="h-4 w-4" />
            <span>Our Sectors</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Industries We Protect</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From retail to construction, our PSA-licensed officers protect businesses across every sector in Ireland.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {industries.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="glass-card border border-white/20 rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:border-primary/40 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrustedIndustries;
