import { Button } from "@/components/ui/button";
import DemoRequestForm from "@/components/forms/demo-request-form";

export default function FinalCTA() {
  const handleRequestDemo = () => {
    const demoForm = document.getElementById("demo-form");
    if (demoForm) {
      demoForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "8+ Hours", label: "saved weekly on invoicing" },
    { value: "30 Days", label: "average setup to full workflow" },
    { value: "24/7", label: "Arabic/English support" }
  ];

  return (
    <section id="final-cta" className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to streamline your property management?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Join 50+ Omani landlords already saving time with Bunanyat's automated invoicing and municipal compliance features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Button 
              onClick={handleRequestDemo}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg min-h-[44px] w-full sm:w-auto"
              data-testid="button-request-demo-final"
            >
              Request Demo
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
          
          <div id="demo-form" className="mt-12">
            <DemoRequestForm />
          </div>
          
          <div className="mt-12 p-6 bg-card rounded-xl shadow-lg border border-border max-w-md mx-auto">
            <h3 className="font-semibold text-foreground mb-2">Need immediate assistance?</h3>
            <p className="text-muted-foreground mb-4">Call us or message on WhatsApp</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="tel:+96891155004" 
                className="text-primary font-semibold text-lg hover:underline min-h-[44px] flex items-center justify-center"
                data-testid="link-phone"
              >
                +968 9115 5004
              </a>
              <a 
                href="https://wa.me/96891155004?text=Hi! I'm interested in Bunayat for my property management business."
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold min-h-[44px] flex items-center justify-center transition-colors"
                data-testid="link-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
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
