'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, List, MessageCircle, Minus, Plus, ShoppingCart, X } from 'lucide-react';

const TOTAL_CHAT_STEPS = 15;

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
    }, 1250);

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
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <a href="#pricing">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <div className="flex flex-col gap-2 pt-2 text-sm text-foreground/60 sm:flex-row sm:gap-6 sm:pt-4">
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
          <div className="relative h-[620px] overflow-hidden md:h-[660px] md:overflow-visible">
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
                      <div className="w-9 h-9 rounded-full bg-white ring-2 ring-white/10 overflow-hidden flex items-center justify-center">
                        <img
                          src="/orderpilot-bot-avatar.svg"
                          alt="OrderPilot bot"
                          className="h-full w-full object-cover"
                        />
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
                      <ChatIn key={`${loopKey}-language-prompt`} className="max-w-[292px]">
                        <div className="flex items-end gap-3 p-3 text-sm leading-snug">
                          <span className="flex-1 font-medium">Please select your language to continue.</span>
                          <span className="text-xs font-semibold text-white/55">10:48 pm</span>
                        </div>
                        <Option>
                          <span className="inline-flex items-center justify-center gap-2">
                            <List className="h-4 w-4" />
                            Select language
                          </span>
                        </Option>
                      </ChatIn>
                    )}

                    {chatStep >= 4 && (
                      <ChatOut key={`${loopKey}-english`} quote="Please select your language to continue.">
                        English
                      </ChatOut>
                    )}

                    {chatStep >= 5 && (
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

                    {chatStep >= 6 && (
                      <ChatOut key={`${loopKey}-start`} quote="Welcome to OrderPilot. Choose an option to continue.">
                        Start order
                      </ChatOut>
                    )}

                    {chatStep >= 7 && (
                      <ChatIn key={`${loopKey}-menu`}>
                        <div className="p-3 text-sm leading-snug">Choose from the restaurant menu.</div>
                        <Option>View menu</Option>
                      </ChatIn>
                    )}

                    {chatStep >= 10 && (
                      <SentCartMessage key={`${loopKey}-sent-cart`} />
                    )}

                    {chatStep >= 11 && (
                      <ChatIn key={`${loopKey}-type`}>
                        <div className="p-3 text-sm leading-snug">Choose order type.</div>
                        <Option>Delivery</Option>
                        <Option>Pickup</Option>
                        <Option>Cancel</Option>
                      </ChatIn>
                    )}

                    {chatStep >= 12 && (
                      <ChatOut key={`${loopKey}-delivery`} quote="Choose order type.">
                        Delivery
                      </ChatOut>
                    )}

                    {chatStep >= 13 && (
                      <ChatIn key={`${loopKey}-confirm`} className="max-w-[275px]">
                        <div className="p-3 text-sm leading-snug">
                          <p>Confirm your order:</p>
                          <p>1. Chicken Burger x1 - PKR 890</p>
                          <p>2. Zinger Wrap x1 - PKR 600</p>
                          <p>Type: Delivery</p>
                          <p>Total: PKR 1,490</p>
                        </div>
                        <Option>Confirm</Option>
                        <Option>View cart</Option>
                        <Option>Cancel</Option>
                      </ChatIn>
                    )}

                    {chatStep >= 14 && (
                      <ChatOut key={`${loopKey}-confirm-reply`} quote="Confirm your order: Chicken Burger x1, Zinger Wrap x1 ...">
                        Confirm
                      </ChatOut>
                    )}

                    {chatStep >= 15 && (
                      <ChatIn key={`${loopKey}-received`} className="max-w-[275px]">
                        <div className="p-3 text-sm leading-snug">
                          Order ORD-20260514-9-0013 received. Total: PKR 1,490
                          <br />
                          Restaurant staff will confirm your order shortly.
                        </div>
                      </ChatIn>
                    )}
                  </div>

                  {chatStep === 3 && (
                    <LanguagePicker key={`${loopKey}-language-picker`} />
                  )}

                  {(chatStep === 8 || chatStep === 9) && (
                    <ProductCollection key={`${loopKey}-product-collection`} />
                  )}

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
            <div className="absolute -bottom-8 -right-8 hidden bg-accent text-accent-foreground rounded-full p-4 shadow-lg md:block">
              <p className="font-bold text-sm">90 Sec Avg Order</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LanguagePicker() {
  const languages = [
    { name: 'English', helper: 'Continue in English' },
    { name: 'اردو', helper: 'اردو میں جاری رکھیں', dir: 'rtl' },
    { name: 'سنڌي', helper: 'سنڌي ۾ جاري رکو', dir: 'rtl' },
    { name: 'Pakistani Roman', helper: 'Roman Urdu/Sindhi' },
  ];

  return (
    <div className="absolute inset-x-0 bottom-[56px] z-30 overflow-hidden rounded-t-3xl bg-[#111b21] text-white shadow-2xl ring-1 ring-white/10 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3">
        <X className="h-5 w-5 text-white/70" />
        <p className="text-lg font-semibold">Select language</p>
      </div>
      <div className="divide-y divide-white/[0.03]">
        {languages.map((language) => (
          <div
            key={language.name}
            className="flex items-center justify-between gap-4 px-4 py-4"
          >
            <div className="min-w-0" dir={language.dir}>
              <p className="text-base font-semibold leading-snug">{language.name}</p>
              <p className="text-sm text-white/70 leading-snug">{language.helper}</p>
            </div>
            <span className="h-6 w-6 flex-shrink-0 rounded-full border-2 border-white/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCollection() {
  const products = [
    {
      name: 'Chicken Burger',
      price: 'PKR 890',
      oldPrice: 'PKR 1,050',
      quantity: 1,
      kind: 'burger',
    },
    {
      name: 'Zinger Wrap',
      price: 'PKR 600',
      quantity: 1,
      kind: 'wrap',
    },
    {
      name: 'Loaded Fries',
      price: 'PKR 550',
      kind: 'fries',
    },
    {
      name: 'Chicken Shawarma',
      price: 'PKR 480',
      kind: 'shawarma',
    },
    {
      name: 'Tikka Pizza Slice',
      price: 'PKR 520',
      oldPrice: 'PKR 650',
      kind: 'pizza',
    },
    {
      name: 'Club Sandwich',
      price: 'PKR 700',
      kind: 'sandwich',
    },
    {
      name: 'Crispy Nuggets',
      price: 'PKR 450',
      kind: 'nuggets',
    },
  ];

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-[#050b0f] text-white animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-3 px-4 pb-2 pt-4">
        <ArrowLeft className="h-6 w-6 flex-shrink-0 text-white/90" />
        <h3 className="min-w-0 flex-1 text-xl font-semibold leading-tight">Product collections</h3>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <ShoppingCart className="h-6 w-6" />
          <span>2</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-20">
        <p className="mb-3 text-base font-bold">Fast Food</p>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.name} className="grid grid-cols-[54px_1fr_auto] items-center gap-3">
              <FoodThumb kind={product.kind} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight">{product.name}</p>
                <p className="mt-1 text-xs leading-tight text-white/60">
                  <span>{product.price}</span>
                  {product.oldPrice && (
                    <span className="ml-2 line-through">{product.oldPrice}</span>
                  )}
                </p>
              </div>
              {product.quantity ? (
                <div className="flex items-center gap-2">
                  <MenuButton>
                    <Minus className="h-4 w-4" />
                  </MenuButton>
                  <span className="text-sm">{product.quantity}</span>
                  <MenuButton>
                    <Plus className="h-4 w-4" />
                  </MenuButton>
                </div>
              ) : (
                <MenuButton>
                  <Plus className="h-4 w-4" />
                </MenuButton>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050b0f] via-[#050b0f] to-transparent px-4 pb-4 pt-7">
        <button className="h-12 w-full rounded-full bg-[#25d366] text-sm font-bold text-[#07130d]">
          View cart (2)
        </button>
      </div>
    </div>
  );
}

function FoodThumb({ kind }: { kind: string }) {
  return (
    <div className="flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-md bg-[#111b21] ring-1 ring-white/10">
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        <rect width="64" height="64" rx="8" fill={kind === 'fries' ? '#271904' : '#151f24'} />
        {kind === 'burger' && (
          <>
            <path d="M12 29c2-12 38-12 40 0H12Z" fill="#f7b733" />
            <rect x="13" y="31" width="38" height="7" rx="2" fill="#2f7d32" />
            <rect x="13" y="38" width="38" height="7" rx="2" fill="#7a2419" />
            <path d="M12 45h40c-2 8-38 8-40 0Z" fill="#f3a33a" />
          </>
        )}
        {kind === 'wrap' && (
          <>
            <path d="M17 14h30L38 54H26L17 14Z" fill="#f2d7a2" />
            <path d="M20 17h24l-4 12H24l-4-12Z" fill="#ec6b32" />
            <circle cx="33" cy="34" r="10" fill="#f5f0df" />
            <path d="M24 30c8 5 14 5 18 0" stroke="#2f7d32" strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {kind === 'fries' && (
          <>
            <path d="M20 27h24l-4 27H24l-4-27Z" fill="#d9362b" />
            <path d="M20 12h5v24h-5zM29 9h5v27h-5zM38 13h5v23h-5z" fill="#ffd34d" />
          </>
        )}
        {kind === 'shawarma' && (
          <>
            <path d="M14 20c14-8 26-8 36 0L35 52H24L14 20Z" fill="#efd6ad" />
            <path d="M20 24c9 6 18 7 26 0" stroke="#e96b2c" strokeWidth="5" strokeLinecap="round" />
            <path d="M24 32c6 3 12 3 18 0" stroke="#2f8f48" strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {kind === 'pizza' && (
          <>
            <path d="M16 13l36 13-25 28L16 13Z" fill="#f5c04e" />
            <path d="M16 13l36 13" stroke="#c75b25" strokeWidth="6" strokeLinecap="round" />
            <circle cx="31" cy="30" r="4" fill="#b51f22" />
            <circle cx="37" cy="39" r="4" fill="#b51f22" />
          </>
        )}
        {kind === 'sandwich' && (
          <>
            <path d="M11 25h42L32 48 11 25Z" fill="#f5dfad" />
            <path d="M15 29h34L32 44 15 29Z" fill="#2f8f48" />
            <path d="M18 34h28L32 44 18 34Z" fill="#e6c358" />
          </>
        )}
        {kind === 'nuggets' && (
          <>
            <ellipse cx="23" cy="28" rx="10" ry="8" fill="#d9932f" />
            <ellipse cx="39" cy="28" rx="10" ry="8" fill="#e2a13d" />
            <ellipse cx="31" cy="40" rx="12" ry="8" fill="#c9822d" />
          </>
        )}
      </svg>
    </div>
  );
}

function MenuButton({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#101820] text-white shadow-sm">
      {children}
    </span>
  );
}

function SentCartMessage() {
  return (
    <div className="chat-message-pop ml-auto max-w-[275px] overflow-hidden rounded-xl rounded-tr-sm bg-[#0b5a3c] text-white shadow-lg">
      <div className="flex gap-3 p-2">
        <FoodThumb kind="burger" />
        <div className="min-w-0 pt-1">
          <div className="flex items-center gap-2 text-sm font-bold">
            <ShoppingCart className="h-4 w-4" />
            <span>2 items</span>
          </div>
          <p className="mt-1 text-sm leading-snug text-white/65">PKR 1,490 estimated total</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 border-t border-white/10 px-3 py-2 text-xs text-white/65">
        9:45 PM <span className="deliver-ticks">&#10003;&#10003;</span>
      </div>
      <div className="border-t border-white/10 py-2 text-center text-sm font-semibold text-[#25d366]">
        View sent cart
      </div>
    </div>
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
