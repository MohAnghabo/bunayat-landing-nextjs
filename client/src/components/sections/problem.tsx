import { X } from "lucide-react";

export default function Problem() {
  const problems = [
    {
      title: "Manual Rent Collection",
      description: "Chasing tenants for rent payments, managing cash, and tracking payments manually."
    },
    {
      title: "Language Barriers",
      description: "Managing Arabic and English documentation, contracts, and communication separately."
    },
    {
      title: "Maintenance Chaos",
      description: "Unorganized maintenance requests, vendor coordination, and cost tracking."
    },
    {
      title: "Poor Tenant Communication",
      description: "Delayed responses to tenant queries and lack of transparency in processes."
    },
    {
      title: "No Financial Insights",
      description: "Lack of clear reporting on property performance and revenue optimization."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Property Management Challenges in Oman
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional property management methods are costing landlords time, money, and tenant satisfaction.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="p-6 bg-card rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center p-8 bg-destructive/10 rounded-lg border-l-4 border-destructive animate-fade-in-up">
          <h3 className="text-2xl font-bold text-destructive mb-2">Hidden Cost Impact</h3>
          <p className="text-lg text-destructive/80">
            Inefficient property management costs Omani landlords <strong>OMR 200+ per month</strong> in lost revenue and increased expenses.
          </p>
        </div>
      </div>
    </section>
  );
}
