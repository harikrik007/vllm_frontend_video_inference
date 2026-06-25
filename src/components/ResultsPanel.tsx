import { AlertTriangle, FileJson } from 'lucide-react'
import type { AnalysisResult } from '../lib/types'
import { Tabs } from './ui/Tabs'
import { SummaryTab } from './tabs/SummaryTab'
import { PeopleTab } from './tabs/PeopleTab'
import { TimelineTab } from './tabs/TimelineTab'
import { ActionsTab } from './tabs/ActionsTab'
import { ObjectsTab } from './tabs/ObjectsTab'
import { EventsTab } from './tabs/EventsTab'
import { LocationsTab } from './tabs/LocationsTab'

interface ResultsPanelProps {
  result: AnalysisResult | null
  streamingText: string
  isStreaming: boolean
  error: string | null
}

export function ResultsPanel({ result, streamingText, isStreaming, error }: ResultsPanelProps) {
  if (error) {
    return (
      <div className="rounded-xl border border-error/30 bg-error/5 p-6">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-5 h-5 text-error" />
          <p className="text-sm font-medium text-error">Analysis Error</p>
        </div>
        <p className="text-sm text-text-secondary">{error}</p>
      </div>
    )
  }

  if (!result && !isStreaming) return null

  const tabs = result
    ? [
        { id: 'summary', label: 'Summary' },
        { id: 'people', label: 'People', count: result.people.length },
        { id: 'timeline', label: 'Timeline', count: result.timeline.length },
        { id: 'actions', label: 'Actions', count: result.actions.length },
        { id: 'objects', label: 'Objects', count: result.objects.length },
        { id: 'events', label: 'Events', count: result.events.length },
        { id: 'locations', label: 'Locations', count: result.locations.length },
      ]
    : [{ id: 'summary', label: 'Summary' }]

  return (
    <div className="rounded-xl border border-border bg-surface">
      <Tabs tabs={tabs} className="px-4 py-3">
        {(activeTab) => {
          if (!result) {
            return (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                  <FileJson className="w-3.5 h-3.5" />
                  Streaming response...
                </div>
                <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                  {streamingText || 'Waiting for response...'}
                </p>
              </div>
            )
          }

          switch (activeTab) {
            case 'summary':
              return <SummaryTab data={result} streamingText={streamingText} />
            case 'people':
              return <PeopleTab data={result} />
            case 'timeline':
              return <TimelineTab data={result} />
            case 'actions':
              return <ActionsTab data={result} />
            case 'objects':
              return <ObjectsTab data={result} />
            case 'events':
              return <EventsTab data={result} />
            case 'locations':
              return <LocationsTab data={result} />
            default:
              return null
          }
        }}
      </Tabs>
    </div>
  )
}
