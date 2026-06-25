import type { AnalysisResult } from '../../lib/types'
import { Card } from '../ui/Card'
import { MapPin } from 'lucide-react'

interface Props {
  data: AnalysisResult
}

export function LocationsTab({ data }: Props) {
  if (!data.locations.length) {
    return <p className="text-sm text-text-muted">No locations recorded.</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.locations.map((loc, i) => (
        <Card key={i} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-sm font-medium text-text-primary">{loc.area}</p>
            {loc.details && (
              <p className="text-xs text-text-secondary leading-relaxed">{loc.details}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
