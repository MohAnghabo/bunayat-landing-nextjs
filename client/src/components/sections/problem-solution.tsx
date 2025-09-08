import { X, Check, CheckCircle } from "lucide-react";

export default function ProblemSolution() {
  const problemSolutions = [
    {
      problem: "Manual Rent Collection",
      problemDesc: "Chasing tenants for payments manually",
      solution: "Automated Rent Collection",
      solutionDesc: "Automatic reminders & online processing"
    },
    {
      problem: "Language Barriers",
      problemDesc: "Separate Arabic/English documentation",
      solution: "Bilingual Documentation",
      solutionDesc: "Auto-generate in Arabic & English"
    },
    {
      problem: "Maintenance Chaos",
      problemDesc: "Unorganized requests & vendors",
      solution: "Smart Maintenance Management",
      solutionDesc: "Centralized tracking & automation"
    },
    {
      problem: "Poor Communication",
      problemDesc: "Delayed responses to tenants",
      solution: "Instant Communication",
      solutionDesc: "WhatsApp integration & tenant portal"
    },
    {
      problem: "No Financial Insights",
      problemDesc: "Lack of clear reporting",
      solution: "Advanced Analytics",
      solutionDesc: "Real-time dashboards & insights"
    }
  ];

  const localFeatures = [
    { title: "OMR Integration", subtitle: "Local payments" },
    { title: "MOH Compliance", subtitle: "Legal standards" },
    { title: "RTL Support", subtitle: "Arabic interface" },
    { title: "24/7 Support", subtitle: "Arabic & English" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            From Problems to Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional property management methods cost landlords time and money. Bunayat provides modern solutions for every challenge.
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
        
        <div className="grid md:grid-cols-1 gap-12 items-center">
         
          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-center animate-fade-in-up animate-delay-300">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Built for Oman's Market</h3>
            <p className="text-muted-foreground mb-6">
              The only platform designed specifically for Omani regulations, payment methods, and cultural preferences.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
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