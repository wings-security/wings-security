import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 'PSA', suffix: '', label: 'Licensed Since Day One', sublabel: 'Licence No. 14161' },
  { value: '24', suffix: '/7', label: 'Security Coverage', sublabel: 'Round-the-clock availability' },
  { value: '48', suffix: 'hr', label: 'Quote Turnaround', sublabel: 'Fast, no-obligation quotes' },
  { value: '100', suffix: '%', label: 'Vetted Officers', sublabel: 'Every officer PSA-compliant' },
];

const StatsSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-wings-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-display font-bold text-primary">
                {stat.value}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-white font-semibold">{stat.label}</div>
              <div className="text-white/50 text-sm mt-1">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
