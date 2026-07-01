'use client';

import { Check, MessageCircle } from 'lucide-react';

export function FastCheckout() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Mock Checkout */}
          <div className="relative h-[480px] order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-[450px] overflow-hidden rounded-[28px] border-[8px] border-[#101820] bg-[#0b141a] shadow-2xl">
                <div className="absolute inset-0 opacity-30 whatsapp-pattern" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="bg-[#101820] px-4 py-3 text-white">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25d366] text-[#07130d]">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">OrderPilot.pk</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 px-3 py-4">
                    <div className="max-w-[286px] overflow-hidden rounded-xl rounded-tl-sm bg-[#202c33] text-white shadow-lg">
                      <div className="p-4">
                        <div className="space-y-3 text-sm leading-snug">
                          <p className="text-lg font-bold leading-tight">Order Details</p>

                          <div className="space-y-1">
                            <p>ID : #7</p>
                            <p>Date : Fri May 15 2026</p>
                          </div>

                          <div className="space-y-1 border-l-4 border-white/55 pl-3 text-white/70">
                            <p>Chicken Burger x 1 : PKR 890</p>
                            <p>Zinger Wrap x 1 : PKR 600</p>
                            <p>Loaded Fries x 1 : PKR 550</p>
                          </div>

                          <div className="space-y-1">
                            <p>Subtotal Amount : PKR 2,040</p>
                            <p>Delivery : PKR 200</p>
                          </div>

                          <p className="text-base font-semibold">Net Amount : PKR 2,240</p>
                        </div>

                        <div className="mt-2 flex justify-end gap-1 text-[11px] text-white/65">
                          9:46 PM <span className="deliver-ticks">&#10003;&#10003;</span>
                        </div>
                      </div>

                      <button className="flex w-full items-center justify-center gap-2 border-t border-white/10 py-2.5 text-sm font-semibold text-[#25d366] transition-colors hover:bg-white/5">
                        <Check className="h-4 w-4" />
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Lightning-Fast Checkout
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed">
              One-tap checkout process keeps customers engaged and reduces cart abandonment. Saved addresses and payment methods make reordering instant.
            </p>
            <ul className="space-y-3">
              {[
                'One-tap checkout on return visits',
                'Save favorite addresses',
                'Instant order confirmation',
                'Real-time delivery tracking',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
