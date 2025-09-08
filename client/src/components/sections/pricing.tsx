import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small landlords",
      price: "OMR 25",
      features: [
        "Up to 10 units",
        "Basic rent collection",
        "Maintenance tracking",
        "Arabic/English support",
        "Email support"
      ],
      cta: "Choose Starter",
      popular: false
    },
    {
      name: "Professional",
      description: "For growing property managers",
      price: "OMR 75",
      features: [
        "Up to 50 units",
        "Advanced automation",
        "WhatsApp integration",
        "Financial analytics",
        "Priority support",
        "API access"
      ],
      cta: "Choose Professional",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large property companies",
      price: "OMR 150",
      features: [
        "Unlimited units",
        "White-label solution",
        "Custom integrations",
        "Advanced reporting",
        "24/7 phone support",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const handlePlanSelection = (planName: string) => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your property portfolio. All plans include free setup and migration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`p-8 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up relative ${
                plan.popular ? 'border-2 border-primary' : 'border border-border'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-secondary" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handlePlanSelection(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
                data-testid={`button-plan-${plan.name.toLowerCase()}`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            All plans include free setup, data migration, and 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
