import { NextResponse } from 'next/server'

const requests = new Map<string, { count: number; reset: number }>()
const required = ['name','restaurant','phone','city'] as const

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const current = requests.get(ip)
  if (current && current.reset > now && current.count >= 5) return NextResponse.json({ message: 'Too many requests. Please wait before trying again.' }, { status: 429 })
  requests.set(ip, current && current.reset > now ? { ...current, count: current.count + 1 } : { count: 1, reset: now + 15 * 60_000 })

  let body: Record<string, unknown>
  try { body = await request.json() } catch { return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 }) }
  if (body.website) return NextResponse.json({ message: 'Request rejected.' }, { status: 400 })
  for (const field of required) if (typeof body[field] !== 'string' || !body[field].trim()) return NextResponse.json({ message: 'Please complete all required fields.' }, { status: 400 })
  if (!/^\+?[0-9 ()-]{7,20}$/.test(String(body.phone))) return NextResponse.json({ message: 'Please enter a valid phone number.' }, { status: 400 })
  if (typeof body.challenge === 'string' && body.challenge.length > 400) return NextResponse.json({ message: 'Please shorten the challenge description.' }, { status: 400 })

  return NextResponse.json({ message: 'Demo delivery is not configured yet. Your details were not stored. Please contact OrderPilot after the official form destination is connected.' }, { status: 503 })
}
