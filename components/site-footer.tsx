import Image from 'next/image'
import Link from 'next/link'
import { Mail, MessageCircle } from 'lucide-react'

const linkGroups = [
  { title: 'Product', links: [['Features', '/#features'], ['How It Works', '/#how-it-works'], ['Pricing', '/pricing'], ['FAQ', '/#faq']] },
  { title: 'Company', links: [['About Us', '/#about'], ['Book a Demo', '/book-demo'], ['Contact', 'mailto:info@digipexsolutions.com']] },
  { title: 'Legal', links: [['Privacy Policy', '#'], ['Terms of Service', '#'], ['Data Deletion', '#'], ['Cookie Policy', '#']] },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#101820] text-white">
      <div className="site-shell py-14 sm:py-18">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" aria-label="OrderPilot home"><Image src="/assets/orderpilot-logo.png" alt="OrderPilot" width={230} height={92} className="h-16 w-auto brightness-0 invert" /></Link>
            <p className="mt-5 max-w-sm leading-7 text-white/60">AI-powered connected ordering software built for Pakistani restaurants.</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/45">OrderPilot is built by the OrderPilot team and backed by Digipex Solutions LLC, a Colorado limited liability company.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {linkGroups.map((group) => <nav key={group.title} aria-label={`${group.title} links`}><h3 className="font-bold text-leaf">{group.title}</h3><ul className="mt-5 flex flex-col gap-3">{group.links.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-white/60 transition-colors hover:text-white">{label}</Link></li>)}</ul></nav>)}
          </div>
        </div>
        <div className="flex flex-col gap-6 border-b border-white/10 py-8 sm:flex-row sm:items-center">
          <FooterContact icon={Mail} label="Email" value="info@digipexsolutions.com" href="mailto:info@digipexsolutions.com" />
          <FooterContact icon={MessageCircle} label="WhatsApp" value="+92 336 1815141" href="https://wa.me/923361815141" />
        </div>
        <div className="flex flex-col gap-3 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 OrderPilot. All rights reserved.</p><p>Built for Pakistani restaurants.</p></div>
      </div>
    </footer>
  )
}

function FooterContact({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  return <div className="flex gap-3"><Icon className="mt-1 size-5 shrink-0 text-leaf" /><div><p className="text-sm text-white/45">{label}</p><a href={href} className="mt-1 block text-sm font-semibold text-white/80 hover:text-leaf">{value}</a></div></div>
}
