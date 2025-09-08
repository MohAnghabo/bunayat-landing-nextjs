import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small landlords",
      monthlyPrice: 25,
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
      monthlyPrice: 75,
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
      monthlyPrice: 150,
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

  const getDisplayPrice = (monthlyPrice: number, planName: string) => {
    if (planName === "Enterprise") {
      return {
        price: "Contact Sales",
        period: "",
        savings: null
      };
    }
    
    if (isAnnual) {
      const annualPrice = monthlyPrice * 10; // 2 months free (10 months instead of 12)
      return {
        price: `OMR ${annualPrice}`,
        period: "/year",
        savings: `Save OMR ${monthlyPrice * 2}`
      };
    }
    return {
      price: `OMR ${monthlyPrice}`,
      period: "/month",
      savings: null
    };
  };

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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the plan that fits your property portfolio. All plans include free setup and migration.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
              data-testid="billing-toggle"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                2 months free
              </span>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const displayPrice = getDisplayPrice(plan.monthlyPrice, plan.name);
            return (
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
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-foreground">{displayPrice.price}</span>
                    <span className="text-muted-foreground ml-1">{displayPrice.period}</span>
                  </div>
                  {displayPrice.savings && (
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                        {displayPrice.savings}
                      </span>
                    </div>
                  )}
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
            );
          })}
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
