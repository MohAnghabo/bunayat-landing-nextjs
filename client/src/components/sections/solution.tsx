import { Check, CheckCircle } from "lucide-react";

export default function Solution() {
  const solutions = [
    {
      title: "Automated Rent Collection",
      description: "Automatic payment reminders, online payment processing, and real-time tracking."
    },
    {
      title: "Bilingual Documentation",
      description: "Generate contracts, invoices, and reports in both Arabic and English automatically."
    },
    {
      title: "Smart Maintenance Management",
      description: "Centralized request tracking, vendor management, and automated notifications."
    },
    {
      title: "Instant Tenant Communication",
      description: "WhatsApp integration, SMS notifications, and tenant portal for seamless interaction."
    },
    {
      title: "Advanced Analytics",
      description: "Real-time dashboards, financial reports, and performance insights for better decisions."
    }
  ];

  const localFeatures = [
    { title: "OMR Integration", subtitle: "Local payments" },
    { title: "MOH Compliance", subtitle: "Legal standards" },
    { title: "RTL Support", subtitle: "Arabic interface" },
    { title: "24/7 Support", subtitle: "Arabic & English" }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            The Bunayat Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Purpose-built for the Omani property market with bilingual support and local payment integration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in-up">
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-center animate-fade-in-up animate-delay-300">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Built for Oman's Property Market</h3>
            <p className="text-muted-foreground mb-6">
              The only property management platform designed specifically for Omani regulations, payment methods, and cultural preferences.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {localFeatures.map((feature, index) => (
                <div key={index} className="p-3 bg-white rounded-lg">
                  <div className="font-semibold text-primary">{feature.title}</div>
                  <div className="text-muted-foreground">{feature.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
