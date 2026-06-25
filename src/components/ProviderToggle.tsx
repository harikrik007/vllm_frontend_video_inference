import clsx from 'clsx'
import type { Provider } from '../lib/types'

interface ProviderToggleProps {
  provider: Provider
  onChange: (provider: Provider) => void
  openaiApiKey: string
  onOpenaiApiKeyChange: (key: string) => void
}

export function ProviderToggle({
  provider,
  onChange,
  openaiApiKey,
  onOpenaiApiKeyChange,
}: ProviderToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex bg-surface-alt rounded-lg p-0.5">
        <button
          onClick={() => onChange('vllm')}
          className={clsx(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
            provider === 'vllm'
              ? 'bg-surface text-text-primary shadow-sm'
              : 'text-text-muted hover:text-text-secondary'
          )}
        >
          vLLM (local)
        </button>
        <button
          onClick={() => onChange('openai')}
          className={clsx(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
            provider === 'openai'
              ? 'bg-surface text-text-primary shadow-sm'
              : 'text-text-muted hover:text-text-secondary'
          )}
        >
          OpenAI
        </button>
      </div>
      {provider === 'openai' && (
        <input
          type="password"
          placeholder="OpenAI API key"
          value={openaiApiKey}
          onChange={(e) => onOpenaiApiKeyChange(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-lg border border-border bg-surface text-text-primary
                     placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30
                     w-44"
        />
      )}
    </div>
  )
}
