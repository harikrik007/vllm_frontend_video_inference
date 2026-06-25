import type { AnalysisResult } from '../../lib/types'

interface Props {
  data: AnalysisResult
  streamingText?: string
}

export function SummaryTab({ data, streamingText }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
        {data.summary || streamingText || 'No summary available.'}
      </p>
    </div>
  )
}
