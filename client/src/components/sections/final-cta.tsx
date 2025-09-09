import { Button } from "@/components/ui/button";
import DemoRequestForm from "@/components/forms/demo-request-form";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";

export default function FinalCTA() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const handleRequestDemo = () => {
    const demoForm = document.getElementById("demo-form");
    if (demoForm) {
      demoForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = t('finalCta.stats', { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>;

  return (
    <section id="final-cta" className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            {t('finalCta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            {t('finalCta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            <Button 
              onClick={handleRequestDemo}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg min-h-[44px] w-full sm:w-auto"
              data-testid="button-request-demo-final"
            >
              {t('finalCta.cta')}
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
          
          <div className="mt-12 max-w-4xl mx-auto">
            <div id="demo-form" className="mb-16">
              <DemoRequestForm />
            </div>
          </div>
          
          {/* Mobile Contact Bar */}
          <div className="lg:hidden mt-8 max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">{t('finalCta.assistance.title')}</h3>
                <p className="text-muted-foreground mb-6">{t('finalCta.assistance.subtitle')}</p>
                
                <div className="flex flex-col gap-4">
                  <a 
                    href="tel:+96891155004" 
                    className="group flex items-center justify-center gap-4 text-primary font-semibold text-lg hover:text-primary/80 transition-colors min-h-[44px] px-4 py-2"
                    data-testid="link-phone-mobile"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    <span dir="ltr">{t('finalCta.assistance.phone')}</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/96891155004?text=Hi! I'm interested in Bunayat for my property management business."
                    className="group flex items-center justify-center gap-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold min-h-[44px] transition-all hover:scale-105"
                    data-testid="link-whatsapp-mobile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-6 h-6">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    {t('finalCta.assistance.whatsapp')}
                  </a>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">{t('finalCta.assistance.hours')}</p>
              </div>
            </div>
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
