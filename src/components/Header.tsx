import { Video } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
          <Video className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Video Inference</h1>
          <p className="text-xs text-text-muted">AI-powered video analysis</p>
        </div>
      </div>
    </header>
  )
}
