import { Check, X } from "lucide-react";

export default function CompetitiveAdvantage() {
  const comparisons = [
    {
      feature: "Rent Collection",
      traditional: "Manual tracking",
      bunanyat: "Automated"
    },
    {
      feature: "Language Support",
      traditional: "English only",
      bunanyat: "Arabic & English"
    },
    {
      feature: "Maintenance Tracking",
      traditional: "Spreadsheets",
      bunanyat: "Real-time dashboard"
    },
    {
      feature: "Tenant Communication",
      traditional: "Phone & Email",
      bunanyat: "WhatsApp + Portal"
    },
    {
      feature: "Financial Reports",
      traditional: "Manual calculations",
      bunanyat: "Automated analytics"
    },
    {
      feature: "Setup Time",
      traditional: "Weeks to months",
      bunanyat: "Less than 24 hours"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Traditional vs Modern Property Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See why forward-thinking property managers in Oman are switching to Bunanyat.
          </p>
        </div>
        
        <div className="overflow-x-auto animate-fade-in-up animate-delay-200">
          <table className="w-full bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-foreground font-semibold">Feature</th>
                <th className="px-6 py-4 text-center text-foreground font-semibold">Traditional Methods</th>
                <th className="px-6 py-4 text-center text-foreground font-semibold bg-primary/10">Bunanyat Platform</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comparison, index) => (
                <tr key={index} className="border-t border-border hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{comparison.feature}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <X className="w-5 h-5 text-destructive" />
                      <span className="text-muted-foreground">{comparison.traditional}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center bg-primary/5">
                    <div className="flex items-center justify-center space-x-2">
                      <Check className="w-5 h-5 text-secondary" />
                      <span className="text-foreground font-medium">{comparison.bunanyat}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
