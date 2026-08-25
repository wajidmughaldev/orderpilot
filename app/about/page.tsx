import type { Metadata } from 'next';
import { Calendar, Heart, Mail, MapPin, Target, Users, Zap } from 'lucide-react';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { BUSINESS_INFO, LEGAL_OPERATOR_LINE } from '@/lib/business-info';

export const metadata: Metadata = {
  title: 'About OrderPilot — AI-Powered Restaurant Ordering Software',
  description:
    'Learn about OrderPilot, a WhatsApp ordering platform for restaurants built by the OrderPilot team and backed by Digipex Solutions.',
};

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We exist to simplify restaurant operations and help businesses grow through practical technology.',
  },
  {
    icon: Users,
    title: 'Customer-First',
    description: "Every feature we build starts with understanding restaurants' real daily ordering needs.",
  },
  {
    icon: Zap,
    title: 'Speed & Simplicity',
    description: 'Powerful tools should be easy to use. No unnecessary complexity, just clear workflows and results.',
  },
  {
    icon: Heart,
    title: 'Local Focus',
    description: 'Built for Pakistan. We understand local restaurants, customer habits, and WhatsApp-first ordering.',
  },
];

const team = [
  { name: 'Abdul Wajid Khan', role: 'Founder & CEO' },
  { name: 'Muhammad Ebad Khan', role: 'Co-Founder & COO' },
  { name: 'Muhammad Hunain Memon', role: 'CTO', additionalRole: 'Founder, Digipex Solutions' },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-background">
      <Header />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-primary/10 via-secondary/5 to-background">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 border border-primary/10">
              About OrderPilot
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Building WhatsApp Ordering for Restaurants
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl mx-auto">
              We started with a simple idea: make ordering food as easy as sending a WhatsApp message.
              OrderPilot is built to help restaurants receive, manage, and fulfill orders with less friction.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  OrderPilot was started to solve a practical restaurant problem: many customers already
                  prefer WhatsApp, but restaurant teams need a cleaner way to turn those conversations into
                  structured orders.
                </p>
                <p>
                  Our focus is straightforward: make the ordering flow clear for customers, reduce repetitive
                  back-and-forth for staff, and keep the restaurant in control of its menu, order details, and
                  customer communication.
                </p>
                <p>
                  We are building the product carefully around real restaurant workflows, starting with the
                  pieces that matter most: WhatsApp conversations, menu browsing, order capture, and status
                  updates.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Pakistan</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Founded 2026</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl" />
              <div className="relative aspect-square bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 rounded-2xl flex items-center justify-center border border-primary/10 shadow-sm">
                <div className="text-center p-8">
                  <img
                    src="/About-logo.png"
                    alt="OrderPilot"
                    className="w-100 h-100 object-contain mx-auto mb-6 drop-shadow-lg"
                  />
                  <p className="text-lg font-semibold text-foreground">OrderPilot</p>
                  <p className="text-sm text-foreground/60">Ordering Made Simple</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-foreground/[0.035]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              The principles that guide everything we build at OrderPilot.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="bg-background border border-border/60 rounded-xl p-6 shadow-sm hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm leading-6 text-foreground/60">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Business Verification</h2>
              <p className="text-foreground/60 leading-relaxed">
                OrderPilot is a restaurant technology startup built by the OrderPilot team and backed by Digipex Solutions. Digipex Solutions provides the registered backing and operational support enabling our product development.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border/60 bg-background p-6">
                <p className="text-sm text-foreground/60 mb-2">Backing Entity</p>
                <p className="font-semibold text-foreground">{BUSINESS_INFO.backerLegalName}</p>
                <p className="text-sm leading-6 text-foreground/60 mt-2">
                  Responsible for the technological, operational support, and development backing of {BUSINESS_INFO.productName}.
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background p-6">
                <p className="text-sm text-foreground/60 mb-2">Registered Address</p>
                <address className="not-italic leading-7 text-foreground/80">
                  {BUSINESS_INFO.backerAddressLine1}
                  <br />
                  {BUSINESS_INFO.backerAddressLine2}
                  <br />
                  {BUSINESS_INFO.backerCountry}
                </address>
              </div>
              <div className="rounded-xl border border-border/60 bg-background p-6 sm:col-span-2">
                <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Business Contact</span>
                </div>
                <a className="font-semibold text-primary hover:underline" href={`mailto:${BUSINESS_INFO.email}`}>
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-16 md:py-24 bg-foreground/[0.035]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              The founding team building OrderPilot around practical restaurant workflows.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center bg-background rounded-2xl border border-border/60 p-6 group shadow-xs">
                <div className="w-28 h-28 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-1 ring-primary/10 group-hover:from-primary/30 group-hover:to-secondary/30 group-hover:scale-105 transition-all duration-300">
                  <span className="text-3xl font-bold text-primary/65">
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-foreground/60">{member.role}</p>
                {member.additionalRole && (
                  <p className="text-xs text-foreground/40 mt-1 font-semibold">{member.additionalRole}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Explore how OrderPilot can support WhatsApp ordering for your restaurant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#pricing"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              View Pricing
            </a>
            <a
              href="/#faq"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
