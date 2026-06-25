import type { AnalysisResult } from '../../lib/types'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { User } from 'lucide-react'

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

function getPersonColor(index: number): string {
  return PERSON_COLORS[index % PERSON_COLORS.length]
}

export function PeopleTab({ data }: Props) {
  if (!data.people.length) {
    return <p className="text-sm text-text-muted">No people detected.</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.people.map((person, i) => {
        const color = getPersonColor(i)
        return (
          <Card key={person.id} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${color}20` }}
              >
                <User className="w-4 h-4" style={{ color }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {person.id.replace('person_', 'Person ')}
                </p>
                {person.gender_apparent && (
                  <p className="text-xs text-text-muted">{person.gender_apparent}</p>
                )}
              </div>
              {person.age_estimate && (
                <Badge
                  label={person.age_estimate}
                  variant="accent"
                />
              )}
            </div>

            {person.physical_description && (
              <p className="text-xs text-text-secondary leading-relaxed">
                {person.physical_description}
              </p>
            )}

            {(person.clothing.top || person.clothing.bottom || person.clothing.accessories.length > 0) && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
                  Clothing
                </p>
                {person.clothing.top && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted w-10 shrink-0">Top</span>
                    <Badge label={person.clothing.top} />
                  </div>
                )}
                {person.clothing.bottom && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted w-10 shrink-0">Bottom</span>
                    <Badge label={person.clothing.bottom} />
                  </div>
                )}
                {person.clothing.accessories.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-text-muted w-10 shrink-0">Acc.</span>
                    <div className="flex flex-wrap gap-1">
                      {person.clothing.accessories.map((acc, j) => (
                        <Badge key={j} label={acc} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
