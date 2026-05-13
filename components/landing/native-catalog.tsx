'use client';

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
                'Variant selection (sizes, toppings)',
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
          <div className="relative flex justify-center">
            {/* Phone Frame */}
            <div className="relative w-[280px] bg-black rounded-[40px] p-2 shadow-2xl">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />
              
              {/* Phone Screen */}
              <div className="bg-[#E8F5F3] rounded-[32px] overflow-hidden">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 pt-2 pb-1 text-xs text-gray-800">
                  <span className="font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5 items-end">
                      <div className="w-1 h-1.5 bg-gray-800 rounded-sm" />
                      <div className="w-1 h-2 bg-gray-800 rounded-sm" />
                      <div className="w-1 h-2.5 bg-gray-800 rounded-sm" />
                      <div className="w-1 h-3 bg-gray-800 rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div className="bg-[#1A6B5C] px-4 py-3 flex items-center justify-between">
                  <div className="w-6" />
                  <h3 className="text-white font-semibold text-base">Catalog</h3>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                {/* Products Section */}
                <div className="bg-white mx-3 mt-3 rounded-xl shadow-sm flex flex-col" style={{ maxHeight: '320px' }}>
                  {/* Products Header */}
                  <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 flex-shrink-0">
                    <span className="font-semibold text-gray-900 text-sm">Products</span>
                    <span className="text-[#1A6B5C] text-xs font-medium cursor-pointer hover:underline">See All</span>
                  </div>

                  {/* Product List - Scrollable */}
                  <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
                    {[
                      { name: 'Margherita Pizza', size: 'Large', price: '1,200', oldPrice: '1,500', icon: 'pizza1' },
                      { name: 'Pepperoni Special', size: 'Medium', price: '950', oldPrice: '1,100', icon: 'pizza2' },
                      { name: 'Garlic Bread', size: '4 Pieces', price: '400', oldPrice: '500', icon: 'bread' },
                      { name: 'Chicken Wings', size: '6 Pieces', price: '650', oldPrice: '750', icon: 'wings' },
                      { name: 'Pasta Alfredo', size: '1 Serving', price: '750', oldPrice: '900', icon: 'pasta' },
                      { name: 'Cold Drink', size: '500ml', price: '120', oldPrice: '150', icon: 'drink' },
                      { name: 'Caesar Salad', size: '1 Bowl', price: '550', oldPrice: '650', icon: 'salad' },
                      { name: 'Cheese Burger', size: 'Regular', price: '480', oldPrice: '580', icon: 'burger' },
                      { name: 'French Fries', size: 'Large', price: '250', oldPrice: '320', icon: 'fries' },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150 hover:bg-[#E8F5F3] active:bg-[#D0EBE6]"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <div className="text-lg">
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
                          <p className="font-medium text-gray-900 text-xs truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-500">{item.size}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 line-through">PKR {item.oldPrice}</p>
                          <p className="text-xs font-semibold text-[#1A6B5C]">PKR {item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Go to Cart Button */}
                <div className="px-3 py-4">
                  <button className="w-full bg-[#1A6B5C] text-white rounded-full py-3 text-sm font-semibold shadow-lg hover:bg-[#155248] transition-colors">
                    Go to Cart
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
