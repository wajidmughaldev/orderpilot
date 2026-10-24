export type OrderPilotEvent = 'demo_cta_click' | 'pricing_model_select' | 'demo_form_submit_success'

export function trackEvent(name: OrderPilotEvent, data?: Record<string, string>) {
  if (typeof window === 'undefined') return
  const analytics = (window as Window & { orderPilotAnalytics?: { track: (event: string, payload?: Record<string, string>) => void } }).orderPilotAnalytics
  analytics?.track(name, data)
}
