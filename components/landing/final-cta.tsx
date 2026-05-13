'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 via-secondary/5 to-background">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Ready to Transform Your Restaurant?
        </h2>
        
        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
          Join 500+ restaurants already using WhatsOrder. Get started with a 30-day free trial, no credit card required.
        </p>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto my-8">
          {[
            'No credit card required',
            'Setup in 10 minutes',
            'Support included',
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 justify-center">
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground/80">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14">
            Start Your Free Trial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="px-8 h-14">
            Schedule a Demo
          </Button>
        </div>

        {/* Social Proof */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-foreground/60 mb-4">Trusted by restaurant owners across Pakistan</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan'].map((city, i) => (
              <span key={i} className="text-xs text-foreground/50 font-medium">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
