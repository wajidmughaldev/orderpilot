'use client';

import { useState } from 'react';

// Realistic food SVG icons
const PizzaIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <path d="M16 3L4 28h24L16 3z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1"/>
    <path d="M16 5L6 26h20L16 5z" fill="#FBBF24"/>
    <circle cx="11" cy="18" r="2" fill="#DC2626"/>
    <circle cx="17" cy="14" r="2" fill="#DC2626"/>
    <circle cx="14" cy="22" r="1.5" fill="#DC2626"/>
    <circle cx="19" cy="20" r="1.5" fill="#DC2626"/>
    <ellipse cx="10" cy="21" rx="1" ry="0.7" fill="#22C55E"/>
    <ellipse cx="16" cy="18" rx="1" ry="0.7" fill="#22C55E"/>
  </svg>
);

const PizzaIcon2 = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <path d="M16 3L4 28h24L16 3z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1"/>
    <path d="M16 5L6 26h20L16 5z" fill="#FBBF24"/>
    <circle cx="10" cy="19" r="1.5" fill="#7C2D12"/>
    <circle cx="15" cy="15" r="1.5" fill="#7C2D12"/>
    <circle cx="18" cy="21" r="1.5" fill="#7C2D12"/>
    <circle cx="13" cy="23" r="1.2" fill="#7C2D12"/>
    <circle cx="20" cy="17" r="1.2" fill="#7C2D12"/>
  </svg>
);

const BreadIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <path d="M5 14c0-5 4-8 11-8s11 3 11 8c0 3-2 5-4 6H9c-2-1-4-3-4-6z" fill="#F59E0B"/>
    <path d="M7 13c0-4 3-6 9-6s9 2 9 6c0 2-1.5 4-3 5H10c-1.5-1-3-3-3-5z" fill="#FBBF24"/>
    <rect x="8" y="19" width="16" height="8" rx="1" fill="#D97706"/>
    <rect x="9" y="20" width="14" height="6" rx="1" fill="#F59E0B"/>
    <path d="M10 14h12" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const WingsIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <ellipse cx="11" cy="14" rx="7" ry="9" fill="#D97706" transform="rotate(-15 11 14)"/>
    <ellipse cx="11" cy="14" rx="5" ry="7" fill="#F59E0B" transform="rotate(-15 11 14)"/>
    <ellipse cx="21" cy="14" rx="7" ry="9" fill="#D97706" transform="rotate(15 21 14)"/>
    <ellipse cx="21" cy="14" rx="5" ry="7" fill="#F59E0B" transform="rotate(15 21 14)"/>
    <rect x="9" y="22" width="4" height="6" rx="1" fill="#92400E"/>
    <rect x="19" y="22" width="4" height="6" rx="1" fill="#92400E"/>
  </svg>
);

const PastaIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <ellipse cx="16" cy="22" rx="11" ry="6" fill="#E5E7EB"/>
    <ellipse cx="16" cy="20" rx="10" ry="5" fill="#F3F4F6"/>
    <path d="M8 18c2-1 4 1 6-1s3 2 6 0 4 1 5 0" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M9 15c2-1 3 1 5-1s4 2 5 0 3 1 4 0" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="11" cy="17" r="1.5" fill="#DC2626"/>
    <circle cx="20" cy="16" r="1.5" fill="#DC2626"/>
    <circle cx="15" cy="19" r="1" fill="#22C55E"/>
  </svg>
);

const DrinkIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <path d="M10 6h12l-2 22H12L10 6z" fill="#0EA5E9"/>
    <path d="M11 8h10l-1.5 18h-7L11 8z" fill="#38BDF8"/>
    <path d="M9 6h14v3H9z" fill="#0284C7" rx="1"/>
    <ellipse cx="16" cy="6" rx="6" ry="2" fill="#0369A1"/>
    <circle cx="14" cy="14" r="1.5" fill="white" opacity="0.6"/>
    <circle cx="18" cy="18" r="1" fill="white" opacity="0.6"/>
    <circle cx="15" cy="21" r="1.2" fill="white" opacity="0.6"/>
  </svg>
);

const SaladIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <ellipse cx="16" cy="22" rx="12" ry="6" fill="#E5E7EB"/>
    <ellipse cx="16" cy="20" rx="11" ry="5" fill="#F3F4F6"/>
    <ellipse cx="12" cy="16" rx="5" ry="4" fill="#22C55E"/>
    <ellipse cx="20" cy="17" rx="4" ry="3" fill="#16A34A"/>
    <ellipse cx="16" cy="14" rx="4" ry="3" fill="#4ADE80"/>
    <circle cx="10" cy="18" r="2" fill="#DC2626"/>
    <circle cx="18" cy="15" r="1.5" fill="#F97316"/>
    <circle cx="22" cy="18" r="1.5" fill="#FBBF24"/>
    <path d="M14 13c1-2 3-2 4 0" stroke="#7C3AED" strokeWidth="1" fill="none"/>
  </svg>
);

const BurgerIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <path d="M6 14h20c0-6-4-10-10-10S6 8 6 14z" fill="#D97706"/>
    <path d="M7 13h18c0-5-3.5-8-9-8S7 8 7 13z" fill="#F59E0B"/>
    <rect x="5" y="14" width="22" height="3" fill="#22C55E"/>
    <rect x="5" y="17" width="22" height="3" fill="#DC2626"/>
    <rect x="5" y="20" width="22" height="2" fill="#FBBF24"/>
    <path d="M6 22h20c0 4-4 6-10 6S6 26 6 22z" fill="#D97706"/>
    <path d="M7 22h18c0 3-3.5 5-9 5S7 25 7 22z" fill="#F59E0B"/>
    <ellipse cx="10" cy="9" rx="1" ry="0.5" fill="#FDE68A"/>
    <ellipse cx="16" cy="8" rx="1" ry="0.5" fill="#FDE68A"/>
    <ellipse cx="22" cy="10" rx="1" ry="0.5" fill="#FDE68A"/>
  </svg>
);

const FriesIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7">
    <path d="M9 14h14l-2 14H11L9 14z" fill="#DC2626"/>
    <path d="M10 15h12l-1.5 12h-9L10 15z" fill="#EF4444"/>
    <rect x="11" y="6" width="2.5" height="12" rx="1" fill="#FBBF24"/>
    <rect x="14.5" y="4" width="2.5" height="14" rx="1" fill="#F59E0B"/>
    <rect x="18" y="5" width="2.5" height="13" rx="1" fill="#FBBF24"/>
    <rect x="12" y="8" width="2" height="10" rx="1" fill="#FCD34D"/>
    <rect x="16.5" y="6" width="2" height="12" rx="1" fill="#FCD34D"/>
  </svg>
);



export function NativeCatalog() {
  const products = [
    { id: 'cheese-paratha', name: 'Cheese Paratha', price: 'PKR 1,200', oldPrice: 'PKR 1,500', icon: 'pasta' },
    { id: 'chicken-burger', name: 'Chicken Burger', price: 'PKR 890', icon: 'burger' },
    { id: 'shawarma', name: 'Shawarma', price: 'PKR 480', icon: 'bread' },
    { id: 'chicken-curry', name: 'Chicken Curry', price: 'PKR 950', icon: 'wings' },
    { id: 'fajita-pizza', name: 'Fajita Pizza', price: 'PKR 1,100', oldPrice: 'PKR 1,450', icon: 'pizza2' },
    { id: 'tender-chicken', name: 'Tender Chicken', price: 'PKR 620', icon: 'fries' },
    { id: 'spicy-sandwich', name: 'Spicy Chicken Sandwich', price: 'PKR 790', icon: 'burger' },
    { id: 'biryani', name: 'Chicken Biryani', price: 'PKR 1,050', icon: 'salad' },
    { id: 'pepperoni-pizza', name: 'Pepperoni Pizza', price: 'PKR 950', oldPrice: 'PKR 1,100', icon: 'pizza1' },
  ];
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const cartCount = Object.values(quantities).reduce((total, quantity) => total + quantity, 0);

  const increment = (id: string) => {
    setQuantities((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1,
    }));
  };

  const decrement = (id: string) => {
    setQuantities((current) => {
      const nextQuantity = Math.max((current[id] ?? 0) - 1, 0);
      const next = { ...current };

      if (nextQuantity === 0) {
        delete next[id];
        return next;
      }

      next[id] = nextQuantity;
      return next;
    });
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Features */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Native WhatsApp Catalog
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed">
              Your menu appears directly in WhatsApp as an interactive catalog. Customers can browse, customize items, and add to cart without leaving the app.
            </p>
            <ul className="space-y-3">
              {[
                'Rich product photos & descriptions',
                'Real-time inventory sync',
                'Instant price updates',
                'Customer favorites saved',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Mock Catalog - Mobile Phone Frame */}
          <div className="relative min-h-[620px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl" />
            {/* Phone Frame */}
            <div className="relative w-[320px] bg-black rounded-[40px] p-2 shadow-2xl">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
              
              {/* Phone Screen */}
              <div className="bg-[#050b0f] rounded-[32px] overflow-hidden">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-4 pt-2 pb-1 text-xs text-white">
                  <span className="font-semibold">9:00</span>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    <span className="text-[9px] font-bold leading-none">Vo<br />LTE</span>
                    <div className="flex gap-0.5 items-end">
                      <div className="w-1 h-1.5 bg-white rounded-sm" />
                      <div className="w-1 h-2 bg-white rounded-sm" />
                      <div className="w-1 h-2.5 bg-white rounded-sm" />
                      <div className="w-1 h-3 bg-white rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Native Product Collection Header */}
                <div className="flex items-center gap-3 px-3 py-2.5 text-white">
                  <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <h3 className="min-w-0 flex-1 text-[17px] font-normal leading-tight">Product collections</h3>
                  <div className="relative flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#25d366] px-1 text-[10px] font-bold text-[#07130d]">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Product List - Scrollable */}
                <div className="px-3 pb-3">
                  <div className="native-catalog-scroll h-[458px] overflow-y-auto pr-0.5 pb-16">
                    {products.map((item) => {
                      const quantity = quantities[item.id] ?? 0;

                      return (
                      <div 
                        key={item.id}
                        className="grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-2.5 py-2"
                      >
                        <div className="w-[52px] h-[52px] bg-[#0b1115] rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden ring-1 ring-white/10">
                          <div className="scale-105">
                            {item.icon === 'pizza1' && <PizzaIcon />}
                            {item.icon === 'pizza2' && <PizzaIcon2 />}
                            {item.icon === 'bread' && <BreadIcon />}
                            {item.icon === 'wings' && <WingsIcon />}
                            {item.icon === 'pasta' && <PastaIcon />}
                            {item.icon === 'drink' && <DrinkIcon />}
                            {item.icon === 'salad' && <SaladIcon />}
                            {item.icon === 'burger' && <BurgerIcon />}
                            {item.icon === 'fries' && <FriesIcon />}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-[13px] leading-tight truncate">{item.name}</p>
                          <p className="mt-0.5 text-[11px] leading-tight text-white/55">
                            <span>{item.price}</span>
                            {item.oldPrice && <span className="ml-2 line-through">{item.oldPrice}</span>}
                          </p>
                        </div>
                        {quantity > 0 ? (
                          <div className="flex items-center gap-1 rounded-lg bg-[#11181d] px-1 py-1 text-white">
                            <button
                              type="button"
                              onClick={() => decrement(item.id)}
                              className="flex h-6 w-5 items-center justify-center rounded-md text-base leading-none"
                              aria-label={`Remove ${item.name}`}
                            >
                              -
                            </button>
                            <span className="w-3.5 text-center text-[11px] font-semibold">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => increment(item.id)}
                              className="flex h-6 w-5 items-center justify-center rounded-md text-base leading-none"
                              aria-label={`Add ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => increment(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#11181d] text-lg leading-none text-white"
                            aria-label={`Add ${item.name}`}
                          >
                            +
                          </button>
                        )}
                      </div>
                      );
                    })}
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="px-3 pb-4">
                  <button className="w-full bg-[#25d366] text-[#07130d] rounded-full py-3 text-sm font-bold shadow-lg hover:bg-[#20bd5a] transition-colors">
                    {cartCount > 0 ? `Cart item (${cartCount})` : 'Checkout'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
