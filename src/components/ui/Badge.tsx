import clsx from 'clsx'

interface BadgeProps {
  label: string
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'person'
  personColor?: string
}

const variantClasses: Record<string, string> = {
  default: 'bg-surface-alt text-text-secondary',
  accent: 'bg-accent-subtle text-accent',
  success: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  person: '',
}

export function Badge({ label, variant = 'default', personColor }: BadgeProps) {
  const style = personColor ? { backgroundColor: `${personColor}20`, color: personColor } : undefined

  return (
    <span
      style={style}
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        !personColor && variantClasses[variant]
      )}
    >
      {label}
    </span>
  )
}
