import { useState } from 'react'
import { Clock, ChevronDown, ChevronUp } from 'lucide-react'
import type { TimingInfo } from '../lib/types'

interface TimingMetricsProps {
  timing: TimingInfo
}

function Metric({ label, value, unit = 's' }: { label: string; value: number; unit?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-text-secondary">{label}</span>
      <span className="text-xs font-mono font-medium text-text-primary tabular-nums">
        {value.toFixed(2)}{unit}
      </span>
    </div>
  )
}

export function TimingMetrics({ timing }: TimingMetricsProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-hover transition-colors"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-text-muted" />
          <span className="text-sm font-medium text-text-primary">Timing</span>
          <span className="text-xs text-text-muted">
            Total: {timing.totalTime.toFixed(1)}s
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-text-muted" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted" />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-3 border-t border-border">
          <div className="space-y-0.5 pt-2">
            <Metric label="Video size" value={timing.videoSizeMB} unit=" MB" />
            <Metric label="Video encoding" value={timing.encodingTime} />
            <Metric label="Upload + server processing" value={timing.uploadAndServerTime} />
            <Metric label="Time to first token (TTFT)" value={timing.ttft} />
            <Metric label="Token generation" value={timing.generationTime} />
            <Metric label="Total inference" value={timing.totalTime} />
          </div>
        </div>
      )}
    </div>
  )
}
