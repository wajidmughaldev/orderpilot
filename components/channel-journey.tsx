'use client'

import { useState } from 'react'
import { MessageCircle, Globe2, QrCode, CheckCircle2 } from 'lucide-react'

const channels = [
  { id: 'WhatsApp', icon: MessageCircle, order: '1 Zinger Burger + fries' },
  { id: 'Web', icon: Globe2, order: '1 Chicken Tikka + rice' },
  { id: 'Table QR', icon: QrCode, order: 'Table 7 · 2 items' },
]
const steps = [
  ['01', 'Customer orders', 'Through WhatsApp, your online menu, or a table QR.'],
  ['02', 'Order details are checked', 'Items, quantities, and other details are confirmed.'],
  ['03', 'Your team sees the order', 'A clear order view keeps everyone on the same page.'],
  ['04', 'Kitchen moves it forward', 'Follow the order from new to preparing to ready.'],
]

export function ChannelJourney() {
  const [active, setActive] = useState(channels[0])
  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap gap-2 border-b border-forest/10 bg-mint/50 p-4" role="tablist" aria-label="Order channel">
        {channels.map((channel) => { const Icon = channel.icon; return <button key={channel.id} onClick={() => setActive(channel)} role="tab" aria-selected={active.id === channel.id} className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold ${active.id === channel.id ? 'bg-forest text-white' : 'bg-white text-ink/65'}`}><Icon className="size-4" aria-hidden="true" />{channel.id}</button> })}
      </div>
      <div className="grid lg:grid-cols-[.75fr_1.25fr]">
        <div className="bg-forest p-7 text-white sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-leaf">Example workflow</p>
          <p className="mt-10 text-sm text-white/55">New order via {active.id}</p>
          <p className="mt-2 text-2xl font-bold">{active.order}</p>
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4"><CheckCircle2 className="text-leaf" /><div><p className="text-sm font-bold">Details confirmed</p><p className="text-xs text-white/55">Ready for the team to review</p></div></div>
        </div>
        <ol className="grid sm:grid-cols-2">
          {steps.map(([number, title, copy]) => <li key={number} className="border-b border-forest/10 p-6 odd:border-r sm:p-8"><span className="font-mono text-sm font-bold text-brand">{number}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{copy}</p></li>)}
        </ol>
      </div>
    </div>
  )
}
