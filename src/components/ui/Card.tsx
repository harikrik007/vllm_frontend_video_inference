import clsx from 'clsx'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface rounded-xl border border-border p-4 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
