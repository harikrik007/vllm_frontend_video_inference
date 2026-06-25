import { Loader2, Play, Square } from 'lucide-react'

interface AnalyzeButtonProps {
  onClick: () => void
  onCancel: () => void
  isStreaming: boolean
  disabled: boolean
}

export function AnalyzeButton({ onClick, onCancel, isStreaming, disabled }: AnalyzeButtonProps) {
  if (isStreaming) {
    return (
      <button
        onClick={onCancel}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-error/10 text-error
                   hover:bg-error/20 transition-colors text-sm font-medium"
      >
        <Square className="w-4 h-4" />
        Cancel
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white
                 hover:bg-accent-hover transition-colors text-sm font-medium
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {disabled ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Play className="w-4 h-4" />
      )}
      Analyze Video
    </button>
  )
}
