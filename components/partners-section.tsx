import Image from 'next/image'

export function PartnersSection() {
  return (
    <section aria-label="Ecosystem partners" className="border-y border-forest/10 bg-white py-6 sm:py-8 dark:border-white/5 dark:bg-[#0c150f]">
      <div className="site-shell">
        <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-6 lg:gap-8">
          {/* 1. National Incubation Center */}
          <div className="flex h-12 w-full items-center justify-center">
            <Image
              src="/assets/ecosystem-nic.webp"
              alt="National Incubation Center"
              width={1115}
              height={614}
              loading="lazy"
              sizes="(min-width: 768px) 160px, 130px"
              className="h-10 sm:h-11 w-auto max-w-[85%] object-contain transition-opacity duration-200 dark:brightness-0 dark:invert dark:opacity-80 hover:dark:opacity-100"
            />
          </div>

          {/* 2. Ignite National Technology Fund */}
          <div className="flex h-12 w-full items-center justify-center">
            <Image
              src="/assets/ecosystem-ignite.webp"
              alt="Ignite National Technology Fund"
              width={1103}
              height={347}
              loading="lazy"
              sizes="(min-width: 768px) 150px, 120px"
              className="h-8 sm:h-9 w-auto max-w-[85%] object-contain transition-opacity duration-200 dark:brightness-0 dark:invert dark:opacity-80 hover:dark:opacity-100"
            />
          </div>

          {/* 3. Ministry of IT and Telecom */}
          <div className="flex h-12 w-full items-center justify-center">
            <Image
              src="/assets/ecosystem-moitt.webp"
              alt="Ministry of IT and Telecom, Government of Pakistan"
              width={1192}
              height={524}
              loading="lazy"
              sizes="(min-width: 768px) 150px, 120px"
              className="h-9 sm:h-10 w-auto max-w-[85%] object-contain transition-opacity duration-200 dark:brightness-0 dark:invert dark:opacity-80 hover:dark:opacity-100"
            />
          </div>

          {/* 4. 100X LIFT (Replacing PTCL) */}
          <div className="flex h-12 w-full items-center justify-center">
            <Image
              src="/assets/ecosystem-100xlift.png"
              alt="100X LIFT"
              width={300}
              height={51}
              loading="lazy"
              sizes="(min-width: 768px) 150px, 120px"
              className="h-7 sm:h-8 w-auto max-w-[85%] object-contain transition-opacity duration-200 opacity-85 hover:opacity-100 dark:hidden"
            />
            <Image
              src="/assets/ecosystem-100xlift-dark.png"
              alt="100X LIFT"
              width={300}
              height={51}
              loading="lazy"
              sizes="(min-width: 768px) 150px, 120px"
              className="h-7 sm:h-8 w-auto max-w-[85%] object-contain transition-opacity duration-200 opacity-85 hover:opacity-100 hidden dark:block"
            />
          </div>

          {/* 5. LMKT */}
          <div className="flex h-12 w-full items-center justify-center">
            <Image
              src="/assets/ecosystem-lmkt.webp"
              alt="LMKT"
              width={1094}
              height={422}
              loading="lazy"
              sizes="(min-width: 768px) 140px, 110px"
              className="h-7 sm:h-8 w-auto max-w-[85%] object-contain transition-opacity duration-200 dark:brightness-0 dark:invert dark:opacity-80 hover:dark:opacity-100"
            />
          </div>

          {/* 6. Digipex Solutions */}
          <div className="flex h-12 w-full items-center justify-center">
            <Image
              src="/assets/ecosystem-digipex.webp"
              alt="Digipex Solutions"
              width={1179}
              height={495}
              loading="lazy"
              sizes="(min-width: 768px) 150px, 120px"
              className="h-9 sm:h-10 w-auto max-w-[85%] object-contain transition-opacity duration-200 dark:brightness-0 dark:invert dark:opacity-80 hover:dark:opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
