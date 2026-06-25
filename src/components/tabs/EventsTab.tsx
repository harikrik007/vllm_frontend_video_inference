import type { AnalysisResult } from '../../lib/types'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

interface Props {
  data: AnalysisResult
}

const EVENT_VARIANTS: Record<string, 'accent' | 'success' | 'warning' | 'default'> = {
  talking: 'accent',
  eating: 'success',
  drinking: 'success',
  running: 'warning',
  fighting: 'warning',
  arguing: 'warning',
  leaving: 'default',
  entering: 'default',
}

export function EventsTab({ data }: Props) {
  if (!data.events.length) {
    return <p className="text-sm text-text-muted">No events recorded.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {data.events.map((event, i) => (
        <Card key={i} className="max-w-sm space-y-2">
          <div className="flex items-center gap-2">
            <Badge
              label={event.type}
              variant={EVENT_VARIANTS[event.type.toLowerCase()] || 'accent'}
            />
            {event.participants.length > 0 && (
              <span className="text-xs text-text-muted">
                {event.participants.map((p) => p.replace('person_', 'P')).join(', ')}
              </span>
            )}
          </div>
          {event.description && (
            <p className="text-xs text-text-secondary leading-relaxed">
              {event.description}
            </p>
          )}
        </Card>
      ))}
    </div>
  )
}
