import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="text-2xl font-bold">order<span className="text-leaf">pilot</span><span className="text-sm text-white/45">.pk</span></Link>
          <p className="mt-3 max-w-sm text-white/60">Connected ordering for restaurants.</p>
          <p className="mt-8 text-sm text-white/40">Built for Pakistani restaurants.</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold" aria-label="Footer navigation">
          <Link href="/" className="hover:text-leaf">Home</Link>
          <Link href="/pricing" className="hover:text-leaf">Pricing</Link>
          <Link href="/book-demo" className="hover:text-leaf">Book a Demo</Link>
        </nav>
      </div>
    </footer>
  )
}
