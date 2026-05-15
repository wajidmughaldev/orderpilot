import { Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

const contactMethods = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+923361815141',
    href: 'https://wa.me/923361815141',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'orderpilot@gmail.com',
    href: 'mailto:orderpilot@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+923361815141',
    href: 'tel:+923361815141',
  },
];

const businessHours = [
  { day: 'Monday - Friday', time: '10:00 AM - 7:00 PM' },
  { day: 'Saturday', time: '11:00 AM - 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export function BookDemoPage() {
  return (
    <main className="overflow-hidden bg-background">
      <Header />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-primary/10 via-secondary/5 to-background">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 border border-primary/10">
              Book a Demo
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              See How OrderPilot Works for Your Restaurant
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl mx-auto">
              Tell us about your restaurant, current ordering channels, and preferred demo time. We will walk you through the WhatsApp ordering flow, menu setup, and staff dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Schedule a Product Walkthrough
                </h2>
                <p className="text-foreground/60 leading-relaxed">
                  The demo is focused on your restaurant workflow: WhatsApp orders, customer conversations, menu management, and how your team can track incoming orders.
                </p>
              </div>

              <div className="grid gap-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;

                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      className="group flex items-center gap-4 rounded-xl border border-border/60 bg-background p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                    >
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span>
                        <span className="block text-sm text-foreground/60">{method.label}</span>
                        <span className="font-semibold text-foreground transition-colors group-hover:text-primary">
                          {method.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="rounded-xl border border-border/60 bg-foreground/[0.035] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground">Business Hours</h3>
                    <p className="text-sm text-foreground/60">Pakistan Standard Time</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {businessHours.map((item) => (
                    <div key={item.day} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-foreground/65">{item.day}</span>
                      <span className="font-semibold text-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
