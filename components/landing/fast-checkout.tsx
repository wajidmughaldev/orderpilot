'use client';

export function FastCheckout() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Mock Checkout */}
          <div className="relative h-96 order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-2xl" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 bg-white rounded-2xl shadow-2xl border-4 border-white overflow-hidden">
                {/* Header */}
                <div className="bg-secondary/10 border-b border-border p-4">
                  <p className="font-bold text-sm text-foreground">Order Summary</p>
                </div>

                {/* Items */}
                <div className="p-4 space-y-2 border-b border-border/50">
                  {[
                    { name: 'Pizza Margherita', qty: '1', price: '1,200' },
                    { name: 'Garlic Bread', qty: '1', price: '400' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-foreground/60">{item.qty}x {item.name}</span>
                      <span className="text-foreground font-medium">PKR {item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="p-4 space-y-2 border-b border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Subtotal</span>
                    <span className="text-foreground">PKR 1,600</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Delivery</span>
                    <span className="text-foreground">PKR 200</span>
                  </div>
                </div>

                {/* Total */}
                <div className="p-4">
                  <div className="flex justify-between font-bold mb-4">
                    <span className="text-foreground">Total</span>
                    <span className="text-secondary">PKR 1,800</span>
                  </div>
                  <button className="w-full bg-secondary text-white rounded-lg py-2 text-sm font-bold hover:bg-secondary/90 transition-colors">
                    Proceed to Pay
                  </button>
                  <p className="text-xs text-foreground/60 text-center mt-2">
                    JazzCash, EasyPaisa, Card, or COD
                  </p>
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
                'Multiple payment options',
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
