'use client'

import { useState } from 'react'
import { Check, ChefHat, Clock3, MessageSquareMore, ReceiptText } from 'lucide-react'

const problems = [
  { title: 'Missed orders', solved: 'Every order captured', icon: MessageSquareMore },
  { title: 'Kitchen confusion', solved: 'Clear kitchen queue', icon: ChefHat },
  { title: 'Slow replies', solved: 'Faster confirmations', icon: Clock3 },
  { title: 'Scattered details', solved: 'One order record', icon: ReceiptText },
]

export function ProblemOrbit() {
  const [solved, setSolved] = useState<string[]>([])

  function solve(title: string) {
    setSolved((current) => current.includes(title) ? current : [...current, title])
  }

  return (
    <div className="problem-orbit" aria-label="Restaurant problems solved by OrderPilot">
      <div className="orbit-center"><span>order</span><strong>pilot</strong><small>One place for every order</small></div>
      {problems.map(({ title, solved: result, icon: Icon }, index) => {
        const isSolved = solved.includes(title)
        return (
          <button key={title} type="button" onClick={() => solve(title)} className={`orbit-bubble orbit-bubble-${index + 1} ${isSolved ? 'is-solved' : ''}`} aria-label={isSolved ? `${title}: ${result}` : `Solve ${title}`}>
            <span className="orbit-icon">{isSolved ? <Check /> : <Icon />}</span>
            <span>{isSolved ? result : title}</span>
            <small>{isSolved ? 'Problem solved' : 'Click to solve'}</small>
          </button>
        )
      })}
    </div>
  )
}
