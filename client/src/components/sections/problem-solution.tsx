import { X, Check } from "lucide-react";

export default function ProblemSolution() {
  const problemSolutions = [
    {
      problem: "Manual Invoice Creation",
      problemDesc: "Typing Arabic invoices, municipal format compliance, tracking due dates manually",
      solution: "Scheduled Generation",
      solutionDesc: "Annual invoices auto-created in Arabic/English municipal format"
    },
    {
      problem: "Chasing Payment Confirmations",
      problemDesc: "Manual follow-ups, awkward phone calls, remembering who confirmed payment",
      solution: "Reminder Automation",
      solutionDesc: "Email/SMS sequences until payment confirmed by tenant"
    },
    {
      problem: "Language Documentation",
      problemDesc: "Municipality requires Arabic contracts, tenants prefer English communication",
      solution: "Bilingual Templates",
      solutionDesc: "Municipality-compliant Arabic invoices, English tenant communications"
    },
    {
      problem: "Maintenance Chaos",
      problemDesc: "WhatsApp screenshots, lost vendor contacts, unclear repair status",
      solution: "Vendor Coordination",
      solutionDesc: "SMS/email notifications to vendors, status tracking without apps"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Why Omani Landlords Choose Digital Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional methods cost time and compliance risks. Streamline with automated workflows.
          </p>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {problemSolutions.map((item, index) => (
            <div 
              key={index}
              className="flex bg-card rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Problem Side */}
              <div className="flex-1 p-6 bg-destructive/5">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.problem}</h3>
                    <p className="text-sm text-muted-foreground">{item.problemDesc}</p>
                  </div>
                </div>
              </div>
              
              {/* Solution Side */}
              <div className="flex-1 p-6 bg-secondary/5">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.solution}</h3>
                    <p className="text-sm text-muted-foreground">{item.solutionDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}