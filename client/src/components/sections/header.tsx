import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRequestDemo = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-border">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="font-bold text-xl text-foreground">Bunanyat</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-features">
            Features
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-pricing">
            Pricing
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-about">
            About
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-faq">
            FAQ
          </a>
        </div>
        
        <Button 
          onClick={handleRequestDemo}
          className="hidden md:block bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all hover:scale-105"
          data-testid="button-request-demo"
        >
          Request Demo
        </Button>
        
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border" data-testid="mobile-menu">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="#features" 
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-features"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-pricing"
            >
              Pricing
            </a>
            <a 
              href="#about" 
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-about"
            >
              About
            </a>
            <a 
              href="#faq" 
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-faq"
            >
              FAQ
            </a>
            <Button 
              onClick={() => {
                handleRequestDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid="mobile-button-request-demo"
            >
              Request Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
