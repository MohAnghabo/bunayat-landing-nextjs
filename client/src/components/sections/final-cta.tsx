import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  const handleStartTrial = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScheduleDemo = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "24 Hours", label: "Average setup time" },
    { value: "30 Days", label: "Money-back guarantee" },
    { value: "24/7", label: "Support availability" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Transform Your Property Management Today
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Join hundreds of property managers in Oman who have already automated their operations, improved tenant satisfaction, and increased revenue with Bunayat.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={handleStartTrial}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
              data-testid="button-start-trial"
            >
              Start Free Trial
            </Button>
            <Button 
              onClick={handleScheduleDemo}
              variant="outline"
              className="bg-card hover:bg-card/80 text-foreground border border-border px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
              data-testid="button-final-schedule-demo"
            >
              Schedule Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-card rounded-xl shadow-lg border border-border max-w-md mx-auto">
            <h3 className="font-semibold text-foreground mb-2">Need immediate assistance?</h3>
            <p className="text-muted-foreground mb-4">Call us directly for instant support</p>
            <a 
              href="tel:+96824123456" 
              className="text-primary font-semibold text-lg hover:underline"
              data-testid="link-phone"
            >
              +968 9115 5004
            </a>
            <p className="text-sm text-muted-foreground mt-2">Available 9 AM - 6 PM GST, Sunday - Thursday</p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-secondary rounded-full"></div>
        <div className="absolute bottom-16 left-1/3 w-24 h-24 bg-accent rounded-full"></div>
      </div>
    </section>
  );
}
