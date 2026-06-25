import { useState, useCallback, useRef } from 'react'
import type { AnalysisResult, TimingInfo } from '../lib/types'
import { SYSTEM_PROMPT } from '../lib/system-prompt'
import { VLLM_MODEL } from '../lib/providers'

function extractJson(text: string): string {
  const cleaned = text.trim()

  const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
  if (jsonMatch) return jsonMatch[0]

  return cleaned
}

export function useInference() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [timing, setTiming] = useState<TimingInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const runInference = useCallback(async (
    videoUri: string,
    prompt: string,
    videoSizeMB: number,
    encodingTime: number,
  ) => {
    setIsStreaming(true)
    setStreamingText('')
    setResult(null)
    setTiming(null)
    setError(null)

    const abortController = new AbortController()
    abortRef.current = abortController

    const requestStartTime = performance.now()

    try {
      const baseUrl = '/api/vllm'
      const apiKey = 'none'
      const model = VLLM_MODEL

      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            {
              type: 'video_url',
              video_url: {
                url: videoUri,
                total_pixels: 512 * 512 * 28,
                min_pixels: 512 * 512 * 28,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ]

      const fetchBody: Record<string, unknown> = {
        model,
        messages,
        max_tokens: 16384,
        stream: true,
        temperature: 0.2,
        top_p: 0.8,
        presence_penalty: 1.5,
      }

      fetchBody.top_k = 20
      fetchBody.repetition_penalty = 1.0
      fetchBody.mm_processor_kwargs = {
        fps: 2.0,
        //do_sample_frames: true,
      }

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(fetchBody),
        signal: abortController.signal,
      })

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorBody}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullText = ''
      let firstChunkTime: number | null = null
      let firstTokenTime: number | null = null

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })

        if (firstChunkTime === null) {
          firstChunkTime = performance.now()
        }

        const lines = chunk.split('\n').filter((line) => line.startsWith('data: '))

        for (const line of lines) {
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content
            if (content) {
              if (firstTokenTime === null) {
                firstTokenTime = performance.now()
              }
              fullText += content
              setStreamingText(fullText)
            }
          } catch {
            // skip unparseable chunks
          }
        }
      }

      const totalTime = (performance.now() - requestStartTime) / 1000
      const uploadAndServerTime = firstChunkTime
        ? (firstChunkTime - requestStartTime) / 1000
        : totalTime
      const ttft = firstTokenTime ? (firstTokenTime - requestStartTime) / 1000 : totalTime
      const generationTime = firstTokenTime
        ? (performance.now() - firstTokenTime) / 1000
        : 0

      setTiming({
        encodingTime,
        uploadAndServerTime,
        ttft,
        generationTime,
        totalTime,
        videoSizeMB,
      })

      const jsonText = extractJson(fullText)
      try {
        const parsed = JSON.parse(jsonText) as AnalysisResult
        setResult(parsed)
      } catch {
        setError('Failed to parse model response as JSON. The model may have returned invalid output.')
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request cancelled')
      } else {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    } finally {
      setIsStreaming(false)
      abortRef.current = null
    }
  }, [])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return {
    isStreaming,
    streamingText,
    result,
    timing,
    error,
    runInference,
    cancel,
  }
}
