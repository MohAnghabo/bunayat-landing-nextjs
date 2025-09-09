import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { trackEvent, trackConversionFunnel } from "@/lib/posthog";

export default function Hero() {
  const { t } = useTranslation();
  
  const handleRequestDemo = () => {
    // Track CTA click
    trackConversionFunnel.ctaClick('hero');
    trackEvent('cta_click', { 
      location: 'hero',
      button_text: t('hero.cta'),
      section: 'hero'
    });
    
    const demoForm = document.getElementById("demo-form");
    if (demoForm) {
      demoForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = t('hero.benefits', { returnObjects: true }) as string[];

  return (
    <section className="hero-gradient py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button 
                onClick={handleRequestDemo}
                size="lg" 
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg min-h-[44px] w-full sm:w-auto"
                data-testid="button-hero-request-demo"
              >
                {t('hero.cta')}
              </Button>
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">{t('hero.pricing')}</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in-up animate-delay-300">
            <figure 
              className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-border" 
              role="img" 
              aria-label="Bunayat property management dashboard showing rent collection, maintenance tracking, and financial reporting for Omani landlords"
              style={{ contentVisibility: 'auto', containIntrinsicSize: '400px 300px' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                </div>
                <span className="text-sm text-muted-foreground">{t('hero.dashboard.title')}</span>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{t('hero.dashboard.rentCard.property')}</p>
                      <p className="text-sm text-muted-foreground">{t('hero.dashboard.rentCard.rentDue')}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">{t('hero.dashboard.rentCard.status')}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{t('hero.dashboard.maintenanceCard.property')}</p>
                      <p className="text-sm text-muted-foreground">{t('hero.dashboard.maintenanceCard.request')}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">{t('hero.dashboard.maintenanceCard.status')}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">OMR 12,500</p>
                    <p className="text-sm text-muted-foreground">{t('hero.dashboard.kpis.monthlyRevenue')}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-secondary/10 rounded-lg text-center">
                    <p className="text-2xl font-bold text-secondary">98.5%</p>
                    <p className="text-sm text-muted-foreground">{t('hero.dashboard.kpis.collectionRate')}</p>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-accent rounded-full"></div>
      </div>
    </section>
  );
}
