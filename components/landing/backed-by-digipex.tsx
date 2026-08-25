'use client';

import { BUSINESS_INFO } from '@/lib/business-info';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export function BackedByDigipex() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/10 uppercase tracking-wide mb-3">
            Business Backing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Backed by {BUSINESS_INFO.backerName}
          </h2>
        </div>

        <div className="relative group overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-muted/50 to-muted/20 p-8 md:p-10 shadow-xs hover:border-primary/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-primary group-hover:scale-110 transition-transform duration-300">
            <ShieldCheck className="w-24 h-24" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-lg mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span>Digipex Solutions</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Backed by an established technology team
              </h3>
              <p className="text-base text-foreground/75 leading-relaxed">
                OrderPilot is built by its dedicated founding team and backed by Digipex Solutions, a registered technology business. Digipex Solutions provides technology and operational support as OrderPilot develops and grows its restaurant SaaS platform.
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href={BUSINESS_INFO.backerWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/95 transition-all shadow-md shadow-primary/10 gap-2 text-sm"
              >
                Visit Digipex Solutions
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
