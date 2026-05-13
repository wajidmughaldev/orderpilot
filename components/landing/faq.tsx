'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How long does setup take?',
    answer:
      'Setup is incredibly simple and takes less than 10 minutes. You create an account, upload your menu items, and share your WhatsApp link with customers. No technical knowledge required.',
  },
  {
    question: 'Do my customers need an app?',
    answer:
      'No! That\'s the beauty of WhatsOrder. Everything happens on WhatsApp, which 95% of Pakistanis already have. No app downloads, no new platforms to learn.',
  },
  {
    question: 'Can I use it with my existing POS system?',
    answer:
      'Yes! We integrate with most popular POS systems. If we don\'t have an integration with your system, our team can build a custom one.',
  },
  {
    question: 'What about payment processing?',
    answer:
      'We support JazzCash, EasyPaisa, credit/debit cards, and cash on delivery. Payments are processed securely and automatically.',
  },
  {
    question: 'Can I manage multiple locations?',
    answer:
      'Yes. Our Professional and Enterprise plans support multiple locations with a unified dashboard.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use enterprise-grade encryption, comply with all Pakistani data protection laws, and maintain 99.9% uptime with regular backups.',
  },
  {
    question: 'What if I need help?',
    answer:
      'Our support team is available via chat, email, and phone. We offer priority support on Professional and Enterprise plans.',
  },
  {
    question: 'Can I customize the experience for my brand?',
    answer:
      'Yes! You can customize your menu, colors, and messaging. Enterprise customers get full white-label solutions.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/60">
            Have more questions? Chat with our team anytime.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border/50">
              <AccordionTrigger className="hover:text-primary transition-colors py-4">
                <span className="text-left font-semibold text-foreground">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
