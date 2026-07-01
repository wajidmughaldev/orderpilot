'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  MessageSquare, 
  Package, 
  TrendingUp, 
  CheckCircle,
  Zap
} from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: Users,
    title: 'Customers Discover',
    description: 'Customers scan your WhatsApp QR or click the link you provide.',
  },
  {
    number: '2',
    icon: MessageSquare,
    title: 'They Browse & Order',
    description: 'Customers see your menu, select items, and place orders on WhatsApp.',
  },
  {
    number: '3',
    icon: Package,
    title: 'You Receive Orders',
    description: 'Orders appear instantly in your restaurant dashboard.',
  },
  {
    number: '4',
    icon: CheckCircle,
    title: 'You Confirm & Prep',
    description: 'Accept orders, set delivery time, and notify customers automatically.',
  },
  {
    number: '5',
    icon: TrendingUp,
    title: 'Customer Gets Updates',
    description: 'Customers receive real-time updates on their order status via WhatsApp.',
  },
  {
    number: '6',
    icon: Zap,
    title: 'You Grow Revenue',
    description: 'Reduce costs, increase order volume, and build customer loyalty.',
  },
];

export function Solution() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How OrderPilot Works
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A simple, elegant flow that turns WhatsApp into your ordering system.
          </p>
        </div>

        {/* Desktop Flow - Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative">
                <Card className="h-full border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-primary mb-1">Step {step.number}</div>
                        <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-foreground/60">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Arrow */}
                {idx < steps.length - 1 && idx % 3 !== 2 && (
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-primary">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Flow - Vertical */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm">
                    {step.number}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-primary/30 mt-2" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-foreground/60">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
