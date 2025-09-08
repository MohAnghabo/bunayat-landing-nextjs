export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      emoji: "📄",
      title: "Upload & Import",
      description: "Upload PDF contracts or take photos to automatically import your property units and tenant information."
    },
    {
      number: 2,
      emoji: "⚙️",
      title: "Configure & Customize",
      description: "Set up payment schedules, maintenance workflows, and communication preferences for your properties."
    },
    {
      number: 3,
      emoji: "🚀",
      title: "Launch & Automate",
      description: "Go live with automated rent collection, maintenance coordination, and tenant communication."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From setup to full automation in less than 24 hours.
          </p>
        </div>
        
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="flex-1 h-0.5 bg-muted"></div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">1</div>
            <div className="flex-1 h-0.5 bg-muted"></div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">2</div>
            <div className="flex-1 h-0.5 bg-muted"></div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">3</div>
            <div className="flex-1 h-0.5 bg-muted"></div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-card rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="lg:hidden w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-6">
                  {step.number}
                </div>
                <div className="text-5xl mb-6">{step.emoji}</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Mobile connecting lines */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-0.5 bg-muted -translate-x-0.5 -z-10"></div>
        </div>
      </div>
    </section>
  );
}
