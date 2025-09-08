export default function Features() {
  const features = [
    {
      emoji: "🏠",
      headline: "Save 15+ Hours Weekly",
      description: "Automated rent collection, maintenance coordination, and financial reporting",
      items: [
        "Auto reminders",
        "Smart scheduling", 
        "Real-time dashboards"
      ]
    },
    {
      emoji: "🇴🇲",
      headline: "Municipality-Compliant Documentation",
      description: "Arabic/English invoices that meet local regulatory standards",
      items: [
        "Bilingual templates",
        "OMR currency",
        "Local payment methods"
      ]
    },
    {
      emoji: "⚡",
      headline: "Live in 24 Hours",
      description: "Complete setup with data migration and team training included",
      items: [
        "PDF contract import",
        "CSV data migration",
        "Free onboarding"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Save 15+ Hours Weekly on Rent Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get paid faster with automated reminders and real-time dashboards.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 bg-card rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-6">{feature.emoji}</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{feature.headline}</h3>
              <p className="text-muted-foreground mb-6 text-lg">{feature.description}</p>
              <ul className="space-y-3">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
