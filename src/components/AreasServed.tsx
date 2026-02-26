const counties = [
  'Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kilkenny', 'Wexford', 'Wicklow',
  'Kildare', 'Meath', 'Louth', 'Westmeath', 'Offaly', 'Laois', 'Carlow', 'Tipperary',
  'Clare', 'Kerry', 'Mayo', 'Sligo', 'Donegal', 'Roscommon', 'Longford', 'Monaghan',
  'Cavan', 'Leitrim', 'Fermanagh', 'Tyrone', 'Antrim', 'Down', 'Armagh', 'Derry',
];

const AreasServed = () => (
  <section id="areas" className="py-20 bg-background-secondary">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            Security Services Across Ireland
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            PSA-licensed security guards available for deployment across all 32 counties.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {counties.map((county) => (
            <span
              key={county}
              className="glass-card border border-primary/20 text-foreground text-sm font-medium px-4 py-1.5 rounded-full hover:border-primary/50 hover:text-primary transition-colors duration-200"
            >
              {county}
            </span>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm max-w-3xl mx-auto">
          WINGS Security is headquartered in Dublin 15 (Blanchardstown) and regularly deploys across Leinster and all provinces.
          We provide security guards near you across Dublin 1, Dublin 2, Dublin 4, Dublin 7, Dublin 8, Dublin 12, Dublin 15,
          and all surrounding counties. Contact us to discuss coverage for your specific location and requirements.
        </p>
      </div>
    </div>
  </section>
);

export default AreasServed;
