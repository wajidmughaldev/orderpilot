import { track } from '@vercel/analytics'

export type OrderPilotEvent = 'demo_cta_click' | 'pricing_model_select' | 'demo_form_submit_success'

export function trackEvent(name: OrderPilotEvent, data?: Record<string, string>) {
  if (typeof window === 'undefined') return
  try {
    track(name, data)
  } catch {
    // Fail gracefully if analytics script is blocked or unavailable
  }
}
