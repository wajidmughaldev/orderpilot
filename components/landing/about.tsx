'use client';

import { BUSINESS_INFO } from '@/lib/business-info';
import { ArrowRight, Building2, HelpCircle, Target, Users } from 'lucide-react';
import Link from 'next/link';

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left Side: Copy */}
          <div className="space-y-6">
            <div>
              <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/10 uppercase tracking-wide mb-4">
                About the Startup
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                About OrderPilot
              </h2>
            </div>
            
            <div className="space-y-5 text-foreground/75 leading-relaxed text-base">
              <p className="font-medium text-foreground">
                OrderPilot is a technology startup building AI-powered conversational commerce software for restaurants. Our platform helps restaurants receive, process, and manage customer orders directly through WhatsApp while giving customers a simple and natural ordering experience.
              </p>
              <p>
                Instead of forcing customers to download another app or navigate a complicated ordering system, OrderPilot brings the ordering journey into a channel they already use every day — WhatsApp.
              </p>
              <p>
                OrderPilot is built by the OrderPilot team and backed by Digipex Solutions, a registered business supporting the product&apos;s technology and growth.
              </p>
              <div className="inline-flex items-center gap-2 p-3 bg-primary/5 border border-primary/10 rounded-xl text-sm font-semibold text-primary">
                <HelpCircle className="w-5 h-5 flex-shrink-0" />
                <span>OrderPilot is a software platform, not a restaurant or food delivery marketplace.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors gap-1.5"
              >
                Contact our team
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-foreground/20">|</span>
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
              >
                Learn more about our mission
              </Link>
            </div>
          </div>

          {/* Right Side: Information Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 bg-background border border-border/50 rounded-2xl shadow-xs space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">What we build</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                AI-powered WhatsApp ordering and conversational commerce software for restaurants.
              </p>
            </div>

            <div className="p-6 bg-background border border-border/50 rounded-2xl shadow-xs space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">Who it&apos;s for</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Restaurants, cafes, cloud kitchens, bakeries, and food businesses.
              </p>
            </div>

            <div className="p-6 bg-background border border-border/50 rounded-2xl shadow-xs space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">Our mission</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Make restaurant ordering faster and easier through conversational technology.
              </p>
            </div>

            <div className="p-6 bg-background border border-border/50 rounded-2xl shadow-xs space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">Backed by</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                <a
                  href={BUSINESS_INFO.backerWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  {BUSINESS_INFO.backerName}
                </a>
                , providing technical and operational support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
