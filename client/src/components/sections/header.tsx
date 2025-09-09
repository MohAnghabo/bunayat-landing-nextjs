import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher, MobileLanguageSwitcher } from "@/components/ui/language-switcher";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRequestDemo = () => {
    const demoForm = document.getElementById("demo-form");
    if (demoForm) {
      demoForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-border">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="font-bold text-xl text-foreground">{t('header.logo')}</span>
        </div>
        
        <div className="hidden md:flex gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-features">
            {t('header.nav.features')}
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-pricing">
            {t('header.nav.pricing')}
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors font-medium" data-testid="nav-faq">
            {t('header.nav.faq')}
          </a>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button 
            onClick={handleRequestDemo}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium transition-all hover:scale-105 px-6 py-2"
            data-testid="button-request-demo"
          >
            {t('header.cta')}
          </Button>
        </div>
        
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
          <div className="container mx-auto px-6 py-6 space-y-4">
            <a 
              href="#features" 
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-features"
            >
              {t('header.nav.features')}
            </a>
            <a 
              href="#pricing" 
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-pricing"
            >
              {t('header.nav.pricing')}
            </a>
            <a 
              href="#faq" 
              className="block text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-faq"
            >
              {t('header.nav.faq')}
            </a>
            <MobileLanguageSwitcher />
            <Button 
              onClick={() => {
                handleRequestDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              data-testid="mobile-button-request-demo"
            >
              {t('header.cta')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
