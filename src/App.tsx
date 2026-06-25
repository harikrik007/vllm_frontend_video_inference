import { useState, useCallback } from 'react'
import type { Provider } from './lib/types'
import { DEFAULT_PROMPT } from './lib/providers'
import { useVideoEncoder } from './hooks/useVideoEncoder'
import { useInference } from './hooks/useInference'
import { Header } from './components/Header'
import { ProviderToggle } from './components/ProviderToggle'
import { VideoUploader } from './components/VideoUploader'
import { PromptEditor } from './components/PromptEditor'
import { AnalyzeButton } from './components/AnalyzeButton'
import { ProgressPanel } from './components/ProgressPanel'
import { TimingMetrics } from './components/TimingMetrics'
import { ResultsPanel } from './components/ResultsPanel'

function App() {
  const [provider, setProvider] = useState<Provider>('vllm')
  const [openaiApiKey, setOpenaiApiKey] = useState('')
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [encodeStartTime, setEncodeStartTime] = useState(0)

  const { isEncoding, encodeProgress, videoUriRef, encode } = useVideoEncoder()
  const { isStreaming, streamingText, result, timing, error, runInference, cancel } =
    useInference()

  const handleVideoSelected = useCallback(
    async (file: File) => {
      setVideoFile(file)
      setEncodeStartTime(performance.now())
      await encode(file)
    },
    [encode],
  )

  const encodingTime = encodeStartTime
    ? (performance.now() - encodeStartTime) / 1000
    : 0

  const handleAnalyze = useCallback(() => {
    const videoUri = videoUriRef.current
    if (!videoUri || !videoFile) return

    const videoSizeMB = videoFile.size / 1_048_576

    runInference(videoUri, prompt, provider, openaiApiKey, videoSizeMB, encodingTime)
  }, [videoUriRef, videoFile, prompt, provider, openaiApiKey, encodingTime, runInference])

  const canAnalyze =
    videoUriRef.current !== null && !isEncoding && !isStreaming

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <ProviderToggle
            provider={provider}
            onChange={setProvider}
            openaiApiKey={openaiApiKey}
            onOpenaiApiKeyChange={setOpenaiApiKey}
          />
        </div>

        <VideoUploader
          onVideoSelected={handleVideoSelected}
          isEncoding={isEncoding}
          encodeProgress={encodeProgress}
          disabled={isStreaming}
        />

        <div className="space-y-4">
          <PromptEditor
            prompt={prompt}
            onChange={setPrompt}
            disabled={isStreaming}
          />

          <div className="flex items-center gap-3">
            <AnalyzeButton
              onClick={handleAnalyze}
              onCancel={cancel}
              isStreaming={isStreaming}
              disabled={!canAnalyze}
            />
            {videoFile && !isStreaming && !result && (
              <span className="text-xs text-text-muted">
                Ready to analyze — {videoFile.name}
              </span>
            )}
          </div>
        </div>

        <ProgressPanel
          isEncoding={isEncoding}
          encodeProgress={encodeProgress}
          isStreaming={isStreaming}
          streamingTextLength={streamingText.length}
        />

        {timing && <TimingMetrics timing={timing} />}

        <ResultsPanel
          result={result}
          streamingText={streamingText}
          isStreaming={isStreaming}
          error={error}
        />

        {result && (
          <div className="text-center pb-8">
            <p className="text-xs text-text-muted">
              Analysis complete · {timing?.totalTime.toFixed(1)}s total
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
