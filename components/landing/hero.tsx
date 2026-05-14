'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

const TOTAL_CHAT_STEPS = 14;

export function Hero() {
  const [chatStep, setChatStep] = useState(1);
  const [loopKey, setLoopKey] = useState(0);
  const chatViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setChatStep((currentStep) => {
        if (currentStep >= TOTAL_CHAT_STEPS) {
          setLoopKey((currentKey) => currentKey + 1);
          return 0;
        }

        return currentStep + 1;
      });
    }, 950);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const chatViewport = chatViewportRef.current;

    if (!chatViewport) {
      return;
    }

    window.requestAnimationFrame(() => {
      chatViewport.scrollTo({
        top: chatViewport.scrollHeight,
        behavior: chatStep <= 1 ? 'auto' : 'smooth',
      });
    });
  }, [chatStep, loopKey]);

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
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
                14-day free trial
              </div>
            </div>
          </div>

          {/* Right: Mockup */}
          <div className="relative h-[570px] md:h-[660px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[330px] h-[630px] bg-[#0b141a] rounded-[36px] shadow-2xl border-[10px] border-[#101820] overflow-hidden">
                <div className="absolute inset-0 opacity-30 whatsapp-pattern" />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="bg-[#101820] px-4 pt-2 pb-3 text-white">
                    <div className="flex items-center justify-between text-xs text-white/80 mb-2">
                      <span>9:41 PM</span>
                      <span className="tracking-[2px]">LTE 80%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-500 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">OrderPilot.pk</p>
                        <p className="text-xs text-white/55">online</p>
                      </div>
                      <div className="ml-auto text-xl leading-none text-white/70">...</div>
                    </div>
                  </div>

                  <div ref={chatViewportRef} className="flex-1 px-3 py-4 overflow-y-hidden space-y-3">
                    {chatStep >= 1 && (
                      <ChatOut key={`${loopKey}-hi`}>Hi</ChatOut>
                    )}

                    {chatStep >= 2 && (
                      <ChatIn key={`${loopKey}-welcome`}>
                        <div className="p-3 text-sm leading-snug">
                          Welcome to OrderPilot.
                          <br />
                          Choose an option to continue.
                        </div>
                        <Option>Start order</Option>
                        <Option>Order status</Option>
                        <Option>Help</Option>
                      </ChatIn>
                    )}

                    {chatStep >= 3 && (
                      <ChatOut key={`${loopKey}-start`} quote="Welcome to OrderPilot. Choose an option to continue.">
                        Start order
                      </ChatOut>
                    )}

                    {chatStep >= 4 && (
                      <ChatIn key={`${loopKey}-category`}>
                        <div className="p-3 text-sm leading-snug">Choose a menu category.</div>
                        <Option>View categories</Option>
                      </ChatIn>
                    )}

                    {chatStep >= 5 && (
                      <ChatOut key={`${loopKey}-pizzas`} quote="Choose a menu category.">
                        Pizzas
                        <br />
                        View available items
                      </ChatOut>
                    )}

                    {chatStep >= 6 && (
                      <ChatIn key={`${loopKey}-items`} className="max-w-[275px]">
                        <div className="p-3 text-sm leading-snug">
                          <p className="font-semibold">Pizzas</p>
                          <p>1. Chicken Tikka Pizza - Rs 1,000</p>
                          <p>2. Peperoni Pizza - Rs 1,500</p>
                          <p>3. Pizza Creamy Delight - Rs 1,200</p>
                          <p className="mt-2">Reply with item number to add it to cart.</p>
                        </div>
                      </ChatIn>
                    )}

                    {chatStep >= 7 && (
                      <ChatOut key={`${loopKey}-two`}>2</ChatOut>
                    )}

                    {chatStep >= 8 && (
                      <ChatIn key={`${loopKey}-cart`} className="max-w-[275px]">
                        <div className="p-3 text-sm leading-snug">
                          <p>Added Peperoni Pizza.</p>
                          <p className="mt-2">Cart total: Rs 1,500</p>
                          <p>What would you like to do next?</p>
                        </div>
                        <Option>Add more</Option>
                        <Option>View cart</Option>
                        <Option>Checkout</Option>
                      </ChatIn>
                    )}

                    {chatStep >= 9 && (
                      <ChatOut key={`${loopKey}-checkout`} quote="Cart total: Rs 1,500. What would you like to do next?">
                        Checkout
                      </ChatOut>
                    )}

                    {chatStep >= 10 && (
                      <ChatIn key={`${loopKey}-type`}>
                        <div className="p-3 text-sm leading-snug">Choose order type.</div>
                        <Option>Delivery</Option>
                        <Option>Pickup</Option>
                        <Option>Cancel</Option>
                      </ChatIn>
                    )}

                    {chatStep >= 11 && (
                      <ChatOut key={`${loopKey}-delivery`} quote="Choose order type.">
                        Delivery
                      </ChatOut>
                    )}

                    {chatStep >= 12 && (
                      <ChatIn key={`${loopKey}-confirm`} className="max-w-[275px]">
                        <div className="p-3 text-sm leading-snug">
                          <p>Confirm your order:</p>
                          <p>1. Peperoni Pizza x1 - Rs 1,500</p>
                          <p>Type: Delivery</p>
                          <p>Total: Rs 1,500</p>
                        </div>
                        <Option>Confirm</Option>
                        <Option>View cart</Option>
                        <Option>Cancel</Option>
                      </ChatIn>
                    )}

                    {chatStep >= 13 && (
                      <ChatOut key={`${loopKey}-confirm-reply`} quote="Confirm your order: 1. Peperoni Pizza x1 - Rs 1,500 ...">
                        Confirm
                      </ChatOut>
                    )}

                    {chatStep >= 14 && (
                      <ChatIn key={`${loopKey}-received`} className="max-w-[275px]">
                        <div className="p-3 text-sm leading-snug">
                          Order ORD-20260514-9-0013 received. Total: Rs 1,500
                          <br />
                          Restaurant staff will confirm your order shortly.
                        </div>
                      </ChatIn>
                    )}
                  </div>

                  <div className="relative z-10 bg-[#101820] px-3 py-2 flex items-center gap-2">
                    <div className="flex-1 rounded-full bg-[#202c33] px-4 py-2 text-sm text-white/45">
                      Message
                    </div>
                    <button className="w-10 h-10 rounded-full bg-[#25d366] text-[#07130d] font-bold flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground rounded-full p-4 shadow-lg">
              <p className="font-bold text-sm">90 Sec Avg Order</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatIn({
  children,
  className = 'max-w-[255px]',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`chat-message-pop rounded-xl rounded-tl-sm bg-[#202c33] text-white shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function ChatOut({
  children,
  quote,
}: {
  children: ReactNode;
  quote?: string;
}) {
  return (
    <div className="chat-message-pop ml-auto max-w-[265px] rounded-xl rounded-tr-sm bg-[#005c4b] text-white shadow-lg p-3">
      {quote && (
        <div className="border-l-4 border-violet-400 bg-black/10 px-2 py-1 mb-2 rounded">
          <p className="text-xs font-semibold">OrderPilot.pk</p>
          <p className="text-xs text-white/65 line-clamp-2">{quote}</p>
        </div>
      )}
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm leading-snug">{children}</span>
        <span className="flex items-center gap-1 text-[11px] text-white/70">
          9:41 PM <span className="deliver-ticks">&#10003;&#10003;</span>
        </span>
      </div>
    </div>
  );
}

function Option({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-white/10 py-2 text-center text-sm font-semibold text-[#25d366]">
      {children}
    </div>
  );
}
