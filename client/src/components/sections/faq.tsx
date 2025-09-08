import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can I get started with Bunayat?",
      answer: "Most customers are running within 24 hours. Free setup assistance and data migration included."
    },
    {
      question: "Does Bunayat support Arabic documents and communication?",
      answer: "Yes! Fully bilingual with Arabic/English contracts, invoices, and WhatsApp communication."
    },
    {
      question: "What payment methods are supported in Oman?",
      answer: "Integrates with major Omani banks. Supports bank transfers, cards, and mobile payments in OMR."
    },
    {
      question: "Can I import my existing property data?",
      answer: "Yes! Upload PDF contracts or photos to import data. CSV imports from Excel also supported."
    },
    {
      question: "Is there a free trial available?",
      answer: "14-day free trial with full access. No credit card required. 30-day money-back guarantee."
    },
    {
      question: "What kind of support do you provide?",
      answer: "Arabic and English support via email, chat, and phone. Local team understands Omani regulations."
    },
    {
      question: "Is my data secure and compliant with Omani regulations?",
      answer: "Enterprise-grade security with 256-bit SSL encryption. Complies with Omani data protection regulations."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes! Upgrade or downgrade anytime. Changes take effect immediately. No long-term contracts."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Bunayat.
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
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                onClick={() => toggleFAQ(index)}
                data-testid={`faq-trigger-${index}`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
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
