import Image from 'next/image'

const ecosystemPartners = [
  { src: '/assets/ecosystem-ignite.webp', alt: 'Ignite National Technology Fund', width: 1103, height: 347, className: 'h-9 lg:h-10' },
  { src: '/assets/ecosystem-moitt.webp', alt: 'Ministry of IT and Telecom, Government of Pakistan', width: 1192, height: 524, className: 'h-10 lg:h-12' },
  { src: '/assets/ecosystem-ptcl.webp', alt: 'PTCL', width: 1137, height: 466, className: 'h-9 lg:h-10' },
  { src: '/assets/ecosystem-lmkt.webp', alt: 'LMKT', width: 1094, height: 422, className: 'h-8 lg:h-9' },
] as const

export function PartnersSection() {
  return (
    <section aria-label="Incubation and partners" className="border-y border-forest/10 bg-white py-7 sm:py-8 dark:border-white/5 dark:bg-[#0c150f]">
      <div className="site-shell flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-0">
        <div className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row md:w-[23%] md:justify-start md:px-0 md:pr-6">
          <p className="partner-label">Incubated at</p>
          <Image src="/assets/ecosystem-nic.webp" alt="National Incubation Center Hyderabad" width={1115} height={614} loading="lazy" sizes="(min-width: 768px) 180px, 140px" className="h-14 w-auto object-contain transition-opacity duration-200 dark:brightness-0 dark:invert dark:opacity-80 hover:dark:opacity-100" />
        </div>

        <div className="border-y border-forest/15 py-6 md:w-[57%] md:border-x md:border-y-0 md:px-7 md:py-0 lg:px-9 dark:border-transparent md:dark:border-transparent">
          <p className="partner-label mb-5 text-center md:text-left">Incubation ecosystem</p>
          <div className="grid grid-cols-2 items-center gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-3 lg:gap-6">
            {ecosystemPartners.map((partner, index) => (
              <figure key={partner.alt} className={`flex min-h-12 items-center justify-center sm:justify-start ${index > 0 ? 'sm:border-l sm:border-forest/10 sm:dark:border-transparent sm:pl-3 lg:pl-5' : ''}`}>
                <Image src={partner.src} alt={partner.alt} width={partner.width} height={partner.height} loading="lazy" sizes="(min-width: 1024px) 150px, (min-width: 640px) 120px, 140px" className={`max-w-full w-auto object-contain transition-opacity duration-200 dark:brightness-0 dark:invert dark:opacity-80 hover:dark:opacity-100 ${partner.className}`} />
              </figure>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row md:w-[20%] md:justify-end md:pl-6 md:pr-0">
          <p className="partner-label">Backed by</p>
          <Image src="/assets/ecosystem-digipex.webp" alt="Digipex Solutions" width={1179} height={495} loading="lazy" sizes="(min-width: 768px) 160px, 140px" className="h-12 w-auto max-w-[9rem] object-contain lg:max-w-[10rem] transition-opacity duration-200 dark:brightness-0 dark:invert dark:opacity-80 hover:dark:opacity-100" />
        </div>
      </div>
    </section>
  )
}
