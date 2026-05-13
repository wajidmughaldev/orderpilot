'use client';

import { Check, Sparkles } from 'lucide-react';

const roadmapItems = [
  {
    quarter: 'Q1 2025',
    title: 'Foundation',
    status: 'completed',
    features: [
      'Core WhatsApp ordering system',
      'Multi-location support',
      'Basic analytics dashboard',
    ],
  },
  {
    quarter: 'Q2 2025',
    title: 'Growth',
    status: 'completed',
    features: [
      'Payment gateway integration',
      'Inventory management',
      'Customer loyalty program',
    ],
  },
  {
    quarter: 'Q3 2025',
    title: 'Intelligence',
    status: 'completed',
    features: [
      'Advanced reporting & insights',
      'AI chatbot for FAQs',
      'Marketing automation tools',
    ],
  },
  {
    quarter: 'Q1 2026',
    title: 'Expansion',
    status: 'upcoming',
    features: [
      'Voice ordering on WhatsApp',
      'Telegram integration',
      'Table reservation system',
    ],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Product Roadmap
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We&apos;re constantly evolving OrderPilot based on customer feedback.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Horizontal Timeline Line */}
          <div className="hidden md:block absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-foreground/20" />

          {/* Timeline Items - Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
            {roadmapItems.map((item, idx) => {
              const isCompleted = item.status === 'completed';
              const isUpcoming = item.status === 'upcoming';

              return (
                <div key={idx} className="flex flex-col items-center min-w-[260px] md:min-w-0 snap-center">
                  {/* Date Badge */}
                  <div className={`px-4 py-1.5 rounded-full text-xs font-semibold mb-3 whitespace-nowrap ${
                    isCompleted 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                      : 'bg-foreground/10 text-foreground/60'
                  }`}>
                    {item.quarter}
                  </div>

                  {/* Node Circle */}
                  <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background mb-4 ${
                    isCompleted 
                      ? 'border-primary text-primary shadow-lg shadow-primary/20' 
                      : 'border-foreground/20 text-foreground/40'
                  }`}>
                    {isCompleted && <Check className="w-5 h-5" />}
                    {isUpcoming && <Sparkles className="w-5 h-5" />}
                  </div>

                  {/* Connector Line to Card */}
                  <div className={`w-0.5 h-4 mb-4 ${isCompleted ? 'bg-primary/40' : 'bg-foreground/10'}`} />

                  {/* Content Card */}
                  <div className={`w-full bg-background rounded-xl border p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isCompleted 
                      ? 'border-primary/20 hover:border-primary/40' 
                      : 'border-foreground/10 hover:border-foreground/20'
                  }`}>
                    {/* Title with Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isCompleted 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-foreground/5 text-foreground/50'
                      }`}>
                        {isCompleted ? 'Done' : 'Soon'}
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            isCompleted ? 'bg-primary' : 'bg-foreground/30'
                          }`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* "Constantly Evolving" indicator */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/20" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-foreground/10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm text-foreground/60 font-medium">Constantly Evolving</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
