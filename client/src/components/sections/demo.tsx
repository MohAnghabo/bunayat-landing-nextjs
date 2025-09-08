import { Button } from "@/components/ui/button";
import DemoRequestForm from "@/components/forms/demo-request-form";
import { MessageCircle } from "lucide-react";

export default function Demo() {
  const handleWhatsAppDemo = () => {
    const message = encodeURIComponent("Hi! I'm interested in a Bunayat demo for my property management business. I manage properties and would like to learn more about your automation features.");
    const whatsappUrl = `https://wa.me/96891155004?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCalendlyDemo = () => {
    // In a real implementation, this would open Calendly widget
    alert('Demo scheduling will open Calendly widget. This is a mockup - integrate with actual Calendly URL.');
  };

  const demoFeatures = [
    {
      emoji: "📊",
      title: "Live Dashboard Walkthrough",
      description: "See real property data, financial reports, and tenant management in action."
    },
    {
      emoji: "💬",
      title: "Bilingual Communication",
      description: "Experience Arabic/English tenant messaging and document generation."
    },
    {
      emoji: "⚙️",
      title: "Automation Features",
      description: "Watch automated rent collection, maintenance workflows, and notifications."
    },
    {
      emoji: "💰",
      title: "ROI Calculator",
      description: "Calculate your potential savings and revenue increase with Bunayat."
    }
  ];

  return (
    <section id="demo" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your Property Management?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            See how Bunayat can automate your operations, improve tenant satisfaction, and increase your revenue. Book a personalized demo today.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">What you'll see in the demo:</h3>
              <div className="space-y-4 text-left">
                {demoFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-2xl">{feature.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-card rounded-xl shadow-lg border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">Schedule a Personalized Demo</h3>
                <p className="text-muted-foreground mb-6">Choose a convenient time for a 30-minute demo session.</p>
                <Button 
                  onClick={handleCalendlyDemo}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105 mb-4"
                  data-testid="button-schedule-demo"
                >
                  Schedule Demo
                </Button>
                <p className="text-sm text-muted-foreground">Available morning (9 AM - 12 PM) and afternoon (2 PM - 5 PM) GST</p>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground mb-4">or</p>
                <Button 
                  onClick={handleWhatsAppDemo}
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105"
                  data-testid="button-whatsapp-demo"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Demo Request</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <DemoRequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
