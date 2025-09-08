import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can I get started with Bunayat?",
      answer: "Most customers are up and running within 24 hours. Our team provides free setup assistance, data migration from existing systems, and comprehensive onboarding. You can start with a few properties and gradually migrate your entire portfolio."
    },
    {
      question: "Does Bunayat support Arabic documents and communication?",
      answer: "Yes! Bunayat is fully bilingual with RTL (Right-to-Left) support for Arabic. You can generate contracts, invoices, and reports in both Arabic and English. The platform also supports Arabic text messaging and WhatsApp communication with tenants."
    },
    {
      question: "What payment methods are supported in Oman?",
      answer: "Bunayat integrates with major Omani banks including Bank Muscat, HSBC Oman, and National Bank of Oman. We support bank transfers, credit/debit cards, and mobile payments. All transactions are processed in OMR with full compliance to local banking regulations."
    },
    {
      question: "Can I import my existing property data?",
      answer: "Absolutely! You can upload PDF contracts or take photos to automatically import property data. We also support CSV imports from Excel spreadsheets. Our AI-powered data extraction recognizes both Arabic and English text, making migration from existing systems seamless."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start. We also provide a 30-day money-back guarantee on all paid plans, so you can try Bunayat risk-free."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide comprehensive support in both Arabic and English. This includes email support, live chat, video tutorials, and phone support for Professional and Enterprise plans. Our local team understands Omani property management challenges and regulations."
    },
    {
      question: "Is my data secure and compliant with Omani regulations?",
      answer: "Yes, Bunayat uses enterprise-grade security with 256-bit SSL encryption and secure data centers. We comply with Omani data protection regulations and Ministry of Housing standards. Your data is backed up daily and you retain full ownership of your information."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate charges based on your usage. There are no long-term contracts or cancellation fees."
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
            Everything you need to know about Bunayat property management platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg shadow-lg border border-border animate-fade-in-up"
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
