import { RevealController } from './reveal-controller'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { SmoothScrollProvider } from './smooth-scroll-provider'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <RevealController />
      <SiteHeader />
      {children}
      <SiteFooter />
    </SmoothScrollProvider>
  )
}
