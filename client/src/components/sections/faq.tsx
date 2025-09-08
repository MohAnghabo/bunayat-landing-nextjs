import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = t('faq.questions', { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
        
        <div className="columns-1 md:columns-2 gap-6 max-w-6xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="break-inside-avoid bg-card rounded-lg shadow-lg border border-border animate-fade-in-up mb-6"
              style={{ animationDelay: `${(index % 4) * 0.1}s` }}
            >
              <button 
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-lg min-h-[44px] touch-manipulation"
                onClick={() => toggleFAQ(index)}
                data-testid={`faq-trigger-${index}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground pr-4 rtl:pr-0 rtl:pl-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transform transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6" data-testid={`faq-content-${index}`}>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
