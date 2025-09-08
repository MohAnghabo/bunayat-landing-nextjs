import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can we start generating invoices?",
      answer: "Most landlords generate their first Arabic invoice within 30 minutes. We import your Excel tenant list, verify municipal formatting, and you can create compliant invoices same-day."
    },
    {
      question: "Do tenants need to download an app for payments?",
      answer: "No. Tenants receive SMS and email notifications with invoice details. They confirm payments via bank transfer using their mobile number - the same method they use for other bills. You track confirmations in Bunanyat."
    },
    {
      question: "Is Arabic language support really complete?",
      answer: "Yes. All invoices, contracts, and official documents generate in proper Arabic formatting that meets municipality requirements. Our Omani customers submit these for audits without modifications."
    },
    {
      question: "How does payment tracking work?",
      answer: "Tenants pay via bank transfer and confirm payment through SMS or email. You mark payments as received in Bunanyat, which automatically stops reminder sequences. Payment gateway integration is available for Enterprise plans."
    },
    {
      question: "Can we export data for our accountant?",
      answer: "Everything exports to Excel with Omani accounting standards. Invoices, payment confirmations, tenant records - your accountant gets familiar formats without learning new software."
    },
    {
      question: "What kind of support do you provide?",
      answer: "Arabic and English support via email, chat, and phone. Local team understands Omani regulations and municipal compliance requirements."
    },
    {
      question: "Is my data secure and compliant with Omani regulations?",
      answer: "Enterprise-grade security with 256-bit SSL encryption. Complies with Omani data protection regulations and municipal audit requirements."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes! Upgrade or downgrade anytime. Changes take effect immediately. No long-term contracts required."
    }
  ];

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
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-lg min-h-[44px] touch-manipulation"
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
