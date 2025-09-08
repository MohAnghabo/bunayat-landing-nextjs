export default function Features() {
  const features = [
    {
      emoji: "🏠",
      title: "Complete Property Management",
      description: "Manage your entire property portfolio from a single dashboard with comprehensive tracking and reporting.",
      items: [
        "Import properties via CSV or manual entry",
        "Track leases, renewals, and expirations",
        "Generate comprehensive property reports",
        "Multi-building portfolio management"
      ]
    },
    {
      emoji: "💰",
      title: "Smart Financial Management",
      description: "Automated rent collection, payment tracking, and financial reporting with OMR currency support.",
      items: [
        "Automated rent reminders & late fees",
        "Online payment processing via Thawani Pay",
        "Financial dashboards & analytics",
        "Tax reporting & expense tracking"
      ]
    },
    {
      emoji: "🔧",
      title: "Maintenance Coordination",
      description: "Streamlined maintenance request management with vendor coordination and cost tracking.",
      items: [
        "Tenant maintenance request portal",
        "Vendor network & rating system",
        "Work order tracking & scheduling",
        "Cost estimation & approval workflows"
      ]
    },
    {
      emoji: "📱",
      title: "Bilingual Communication",
      description: "Seamless Arabic/English communication with tenants through multiple channels.",
      items: [
        "WhatsApp integration for instant messaging",
        "SMS notifications in Arabic/English",
        "Tenant self-service portal",
        "Document translation & generation",
        "Live dashboard walkthroughs",
        "ROI calculator for potential savings"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Manage Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools designed specifically for the Omani property management market.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 bg-card rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-6">{feature.emoji}</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 text-lg">{feature.description}</p>
              <ul className="space-y-3">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center space-x-3">
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
