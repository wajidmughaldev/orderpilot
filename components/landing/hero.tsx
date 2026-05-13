'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                ✨ Trusted by 500+ restaurants
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Restaurant Orders Through <span className="text-primary">WhatsApp</span>
            </h1>
            
            <p className="text-lg text-foreground/60 leading-relaxed max-w-xl">
              OrderPilot streamlines your restaurant&apos;s ordering process. Customers order via WhatsApp, your team manages orders efficiently, and you increase revenue with minimal effort.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with Us
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                30-day free trial
              </div>
            </div>
          </div>

          {/* Right: Mockup */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Phone Mockup */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-96 bg-white rounded-3xl shadow-2xl border-8 border-primary/10 overflow-hidden">
                {/* Phone Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-primary/20 flex items-center justify-between px-4 text-xs font-medium">
                  <span>9:41</span>
                  <span>●●●●●</span>
                </div>

                {/* WhatsApp Chat */}
                <div className="pt-8 pb-12 px-4 h-full overflow-y-auto flex flex-col gap-3">
                  {/* Incoming Message */}
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-800">
                      <p className="font-medium">Pizza Restaurant</p>
                      <p className="text-xs text-gray-600 mt-1">Hi! What would you like to order?</p>
                    </div>
                  </div>

                  {/* Outgoing Message */}
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-primary rounded-2xl rounded-tr-none p-3 text-sm text-white">
                      Can I get a large Margherita pizza?
                    </div>
                  </div>

                  {/* Incoming Response */}
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-800">
                      <p className="text-xs text-gray-600">Great choice!</p>
                      <p className="text-xs text-gray-600 mt-1">Price: PKR 1,200</p>
                      <p className="text-xs text-gray-600 mt-1">Delivery: 30 mins</p>
                    </div>
                  </div>

                  {/* Outgoing Confirmation */}
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-secondary rounded-2xl rounded-tr-none p-3 text-sm text-white">
                      ✓ Confirmed. Send to Gulberg
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    disabled
                    className="flex-1 bg-gray-100 rounded-2xl px-3 py-2 text-xs text-gray-600"
                  />
                  <button className="text-primary font-bold">➤</button>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground rounded-full p-4 shadow-lg">
              <p className="font-bold text-sm">⚡ 80% faster</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
