interface PromptEditorProps {
  prompt: string
  onChange: (prompt: string) => void
  disabled?: boolean
}

export function PromptEditor({ prompt, onChange, disabled }: PromptEditorProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1.5">
        Prompt
      </label>
      <textarea
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={2}
        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface text-text-primary
                   placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30
                   resize-none disabled:opacity-50"
        placeholder="Describe the video in fine grained detail."
      />
      <span className="text-xs text-text-muted mt-1 block text-right">
        {prompt.length} chars
      </span>
    </div>
  )
}
