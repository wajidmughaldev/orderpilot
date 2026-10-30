'use client'

import { ChevronDown } from 'lucide-react'

export type FaqItem = { question: string; answer: string }

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="w-full divide-y divide-forest/15 border-y border-forest/15">
      {items.map((item, index) => (
        <details key={item.question} className="group py-1" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-bold marker:hidden">
            {item.question}<ChevronDown className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="w-full max-w-none pb-6 pr-6 sm:pr-10 text-base leading-7 text-ink/80">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
