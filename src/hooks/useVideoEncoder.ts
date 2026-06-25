import { useState, useCallback, useRef } from 'react'

export function useVideoEncoder() {
  const [isEncoding, setIsEncoding] = useState(false)
  const [encodeProgress, setEncodeProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const videoUriRef = useRef<string | null>(null)

  const encode = useCallback(async (file: File): Promise<string> => {
    setIsEncoding(true)
    setEncodeProgress(0)
    setError(null)

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setEncodeProgress(Math.round((e.loaded / e.total) * 100))
        }
      }

      reader.onload = () => {
        const dataUri = reader.result as string
        videoUriRef.current = dataUri
        setIsEncoding(false)
        resolve(dataUri)
      }

      reader.onerror = () => {
        setIsEncoding(false)
        const err = 'Failed to read video file'
        setError(err)
        reject(new Error(err))
      }

      reader.readAsDataURL(file)
    })
  }, [])

  return {
    isEncoding,
    encodeProgress,
    error,
    videoUriRef,
    encode,
  }
}
