'use client';

export function DashboardPreview() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Dashboard Preview
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Dashboard
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Manage all your orders, track real-time status, and streamline operations from one elegant interface.
          </p>
        </div>

        {/* Dashboard Screenshot */}
        <div className="relative">
          {/* Glow effect behind the image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-2xl opacity-50" />
          
          {/* Browser Frame */}
          <div className="relative bg-foreground/5 rounded-xl border border-border/50 shadow-2xl overflow-hidden">
            {/* Browser Header */}
            <div className="bg-muted/80 border-b border-border/50 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-background/80 rounded-md px-4 py-1.5 text-xs text-foreground/60 flex items-center gap-2 max-w-md w-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>orderpilot.pk/dashboard</span>
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* Dashboard Screenshot Image */}
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-su4HxDEIRDErtJvB3NeeKVVNS9gSYg.png"
                alt="OrderPilot Dashboard - Restaurant order management with real-time tracking, Kanban pipeline, and WhatsApp integration"
                className="w-full h-auto"
              />
              
              {/* Subtle overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Feature highlights below the image */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Real-time Order Tracking', icon: '⚡' },
            { label: 'Kanban Pipeline View', icon: '📋' },
            { label: 'WhatsApp Integration', icon: '💬' },
            { label: 'Multi-branch Support', icon: '🏪' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-foreground/80">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
