export default function Features() {
  const features = [
    {
      emoji: "🏠",
      headline: "Automated Invoicing",
      description: "Stop creating invoices manually and chasing payment confirmations with phone calls. Bunanyat handles scheduled Arabic/English invoicing and automated reminder sequences while you focus on growing your portfolio.",
      items: [
        "Scheduled annual invoice generation",
        "Automated SMS/email reminder sequences",
        "Payment confirmation tracking"
      ]
    },
    {
      emoji: "🇴🇲",
      headline: "Built for Oman Compliance",
      description: "Arabic invoices meet municipal requirements. English tenant communications keep everyone informed. Bank transfer tracking works with Omani mobile banking habits.",
      items: [
        "Arabic contracts with proper formatting",
        "Compliant invoice numbering system",
        "Bank transfer confirmation tracking"
      ]
    },
    {
      emoji: "⚡",
      headline: "Quick Implementation",
      description: "Import your current tenant list via Excel. Generate your first Arabic invoice the same day. No technical training required - if you use WhatsApp, you can use Bunanyat.",
      items: [
        "Excel import with error checking",
        "Same-day first invoice generation",
        "Phone support in Arabic & English"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Three Honest Value Propositions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real solutions for real Omani landlord challenges.
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
