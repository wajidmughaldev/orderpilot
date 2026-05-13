'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Hassan',
    role: 'Owner, Pizza Palace Lahore',
    content:
      'OrderPilot increased our order volume by 45% in the first month. Our customers love it, and our team is way more efficient.',
    rating: 5,
  },
  {
    name: 'Fatima Khan',
    role: 'Manager, Spice Kitchen Karachi',
    content:
      'We went from 10 orders/day to 60+ orders/day. This has been a game-changer for our business. The support team is incredible.',
    rating: 5,
  },
  {
    name: 'Bilal Ahmed',
    role: 'Chef & Founder, Biryani House Islamabad',
    content:
      'Setting up was incredibly easy. No technical knowledge needed. Our customers were ordering within 24 hours of launch.',
    rating: 5,
  },
  {
    name: 'Ayesha Malik',
    role: 'Owner, Cafe Corner Rawalpindi',
    content:
      'The best investment we made this year. Reduced our operational costs by 30% while increasing customer satisfaction.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by Restaurant Owners
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            See what our customers are saying about OrderPilot.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="border-border/50 hover:border-primary/30 transition-all hover:shadow-md flex flex-col"
            >
              <CardContent className="pt-6 flex flex-col h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-foreground/80 mb-4 flex-grow">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-border/50">
                  <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-foreground/60">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
