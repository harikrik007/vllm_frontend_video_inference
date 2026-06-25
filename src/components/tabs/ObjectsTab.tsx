import type { AnalysisResult } from '../../lib/types'
import { Card } from '../ui/Card'
import { Box } from 'lucide-react'

interface Props {
  data: AnalysisResult
}

export function ObjectsTab({ data }: Props) {
  if (!data.objects.length) {
    return <p className="text-sm text-text-muted">No objects detected.</p>
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {data.objects.map((obj, i) => (
        <Card key={i} className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface-alt flex items-center justify-center shrink-0">
              <Box className="w-4 h-4 text-text-muted" />
            </div>
            <p className="text-sm font-medium text-text-primary truncate">{obj.name}</p>
          </div>
          {obj.description && (
            <p className="text-xs text-text-secondary leading-relaxed">{obj.description}</p>
          )}
          {obj.interaction && (
            <div className="pt-1.5 border-t border-border">
              <p className="text-xs font-medium text-text-muted mb-0.5">Interaction</p>
              <p className="text-xs text-text-primary">{obj.interaction}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
