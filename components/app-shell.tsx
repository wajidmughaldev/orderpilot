import { RevealController } from './reveal-controller'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export function AppShell({ children }: { children: React.ReactNode }) {
  return <><RevealController /><SiteHeader />{children}<SiteFooter /></>
}
