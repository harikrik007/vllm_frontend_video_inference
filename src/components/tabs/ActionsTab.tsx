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

export function ActionsTab({ data }: Props) {
  function getPersonColor(personId: string): string {
    const idx = data.people.findIndex((p) => p.id === personId)
    return PERSON_COLORS[idx >= 0 ? idx : 0]
  }

  if (!data.actions.length) {
    return <p className="text-sm text-text-muted">No actions recorded.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
              Person
            </th>
            <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
              Action
            </th>
            <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
              Body Part
            </th>
            <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
              Target Object
            </th>
          </tr>
        </thead>
        <tbody>
          {data.actions.map((action, i) => {
            const color = getPersonColor(action.person_id)
            const label = action.person_id
              ? action.person_id.replace('person_', 'P')
              : ''

            return (
              <tr key={i} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                <td className="py-2.5 px-3">
                  {label && <Badge label={label} personColor={color} />}
                </td>
                <td className="py-2.5 px-3 text-text-primary">{action.action}</td>
                <td className="py-2.5 px-3 text-text-secondary">{action.body_part || '-'}</td>
                <td className="py-2.5 px-3 text-text-secondary">{action.target_object || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
