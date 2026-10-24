'use client'

import { ChevronDown } from 'lucide-react'

export type FaqItem = { question: string; answer: string }

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-forest/15 border-y border-forest/15">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-bold marker:hidden">
            {item.question}<ChevronDown className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="max-w-3xl pb-6 pr-10 leading-7 text-ink/65">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
