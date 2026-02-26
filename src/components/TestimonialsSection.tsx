import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: 'WINGS Security provided excellent static guarding for our construction site in Dublin 12. Professional, punctual, and fully PSA-compliant.',
    author: 'Site Manager',
    company: 'Dublin Construction Company',
    stars: 5,
  },
  {
    quote: 'We used WINGS for a corporate event in Dublin. The team were well-presented, calm under pressure, and the whole event ran without incident.',
    author: 'Event Coordinator',
    company: 'Dublin Corporate Client',
    stars: 5,
  },
  {
    quote: 'Getting a quote was fast and straightforward. Our retail premises have had zero security incidents since we onboarded with WINGS.',
    author: 'Retail Manager',
    company: 'Dublin City Centre Retailer',
    stars: 5,
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 bg-background-secondary">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 glass-card border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
            <Star className="h-4 w-4" />
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">What Our Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="glass-card border border-white/20">
              <CardContent className="p-6 space-y-4">
                <Quote className="h-8 w-8 text-primary/30" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
