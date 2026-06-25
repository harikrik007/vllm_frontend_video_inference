export interface Person {
  id: string
  gender_apparent: string
  age_estimate: string
  clothing: {
    top: string
    bottom: string
    accessories: string[]
  }
  physical_description: string
}

export interface Action {
  person_id: string
  action: string
  body_part: string
  target_object: string
}

export interface VideoObject {
  name: string
  description: string
  interaction: string
}

export interface AnalysisEvent {
  type: string
  participants: string[]
  description: string
}

export interface Location {
  area: string
  details: string
}

export interface TimelineEntry {
  start_time: string
  end_time: string
  person_id: string
  action: string
  object_involved: string
}

export interface AnalysisResult {
  summary: string
  people: Person[]
  actions: Action[]
  objects: VideoObject[]
  events: AnalysisEvent[]
  locations: Location[]
  timeline: TimelineEntry[]
}

export interface TimingInfo {
  encodingTime: number
  uploadAndServerTime: number
  ttft: number
  generationTime: number
  totalTime: number
  videoSizeMB: number
}

export interface InferenceState {
  videoUri: string | null
  prompt: string
  isEncoding: boolean
  encodeProgress: number
  isStreaming: boolean
  streamingText: string
  result: AnalysisResult | null
  timing: TimingInfo | null
  error: string | null
}
