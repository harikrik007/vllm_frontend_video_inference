import { Loader2 } from 'lucide-react'

interface ProgressPanelProps {
  isEncoding: boolean
  encodeProgress: number
  isStreaming: boolean
  streamingTextLength: number
}

export function ProgressPanel({
  isEncoding,
  encodeProgress,
  isStreaming,
  streamingTextLength,
}: ProgressPanelProps) {
  if (!isEncoding && !isStreaming) return null

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center gap-3">
        {isEncoding && (
          <>
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Encoding video</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-surface-alt overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${encodeProgress}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-text-muted">{encodeProgress}%</span>
          </>
        )}
        {isStreaming && !isEncoding && (
          <>
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Analyzing video</p>
              <p className="text-xs text-text-muted">Streaming response...</p>
            </div>
            <span className="text-xs text-text-muted tabular-nums">
              {streamingTextLength.toLocaleString()} chars
            </span>
          </>
        )}
      </div>
    </div>
  )
}
