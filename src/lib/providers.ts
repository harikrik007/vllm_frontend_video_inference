import { createOpenAI } from '@ai-sdk/openai'

export const vllmProvider = createOpenAI({
  baseURL: '/api/vllm',
  apiKey: 'none',

})

export function getOpenAIProvider(apiKey: string) {
  return createOpenAI({
    apiKey,
  })
}

export const DEFAULT_PROMPT = 'Describe the video in fine grained detail.'

export const VLLM_MODEL = 'vllm_model'
export const OPENAI_MODEL = 'gpt-4o'
