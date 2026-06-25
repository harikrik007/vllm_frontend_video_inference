import type { AnalysisResult } from '../../lib/types'
import { Badge } from '../ui/Badge'

interface Props {
  data: AnalysisResult
}

const PERSON_COLORS = [
  '#6c5ce7',
  '#00b894',
  '#e17055',
  '#0984e3',
  '#fdcb6e',
  '#e84393',
  '#00cec9',
  '#a29bfe',
]

export function TimelineTab({ data }: Props) {
  function getPersonColor(personId: string): string {
    const idx = data.people.findIndex((p) => p.id === personId)
    return PERSON_COLORS[idx >= 0 ? idx : 0]
  }

  if (!data.timeline.length) {
    return <p className="text-sm text-text-muted">No timeline events recorded.</p>
  }

  const sorted = [...data.timeline].sort((a, b) => {
    const aTime = a.start_time || a.end_time
    const bTime = b.start_time || b.end_time
    if (!aTime && !bTime) return 0
    if (!aTime) return 1
    if (!bTime) return -1
    return aTime.localeCompare(bTime)
  })

  return (
    <div className="relative pl-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-border">
      {sorted.map((entry, i) => {
        const color = getPersonColor(entry.person_id)
        const label = entry.person_id
          ? entry.person_id.replace('person_', 'P')
          : ''

        return (
          <div key={i} className="relative pb-5 last:pb-0">
            <div
              className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full border-2 border-surface shrink-0"
              style={{ backgroundColor: color }}
            />
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-medium text-text-muted">
                {entry.start_time || '--:--'}
                {entry.end_time && entry.start_time !== entry.end_time
                  ? ` - ${entry.end_time}`
                  : ''}
              </span>
              {label && (
                <Badge label={label} personColor={color} />
              )}
            </div>
            <p className="text-sm text-text-primary">{entry.action}</p>
            {entry.object_involved && (
              <p className="text-xs text-text-muted mt-0.5">
                Object: {entry.object_involved}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
