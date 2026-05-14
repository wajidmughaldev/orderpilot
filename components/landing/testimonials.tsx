'use client';

import { Star } from 'lucide-react';

const reviews = [
  {
    initials: 'A.W.',
    role: 'Restaurant owner',
    text: 'OrderPilot is built around the way customers already message us. A clearer WhatsApp order flow can help orders and sales grow day by day without adding extra confusion for staff.',
  },
  {
    initials: 'E.K.',
    role: 'Counter manager',
    text: 'The value is simple: menu choices, customer details, and order status stay organized in one flow. That makes busy hours easier to manage.',
  },
  {
    initials: 'R.O.',
    role: 'Restaurant operator',
    text: 'Customers do not need to download another app. They can start from WhatsApp, choose what they want, and share the details in a more structured way.',
  },
  {
    initials: 'S.L.',
    role: 'Service lead',
    text: 'Clear order summaries and updates can reduce repeated questions between the customer, counter, and delivery team.',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built for Restaurant Owners
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Practical feedback themes shaping how OrderPilot supports WhatsApp ordering.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((item) => (
            <article
              key={item.initials}
              className="rounded-xl border border-border/70 bg-card p-6 md:p-7 shadow-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-1 text-accent mb-5" aria-label="Five star feedback">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-base leading-7 text-foreground/75">&quot;{item.text}&quot;</p>

              <div className="mt-6 pt-5 border-t border-border/60">
                <p className="font-bold text-foreground">{item.initials}</p>
                <p className="text-sm text-foreground/55">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
