import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`rounded-(--radius-token-lg) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-token-sm) ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-lg font-semibold text-(--color-ink)">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-(--color-ink-secondary)">{description}</p>
      )}
    </div>
  )
}
