import { useState, useCallback, useRef } from 'react'
import { Upload, Film, X } from 'lucide-react'
import clsx from 'clsx'

interface VideoUploaderProps {
  onVideoSelected: (file: File) => void
  isEncoding: boolean
  encodeProgress: number
  disabled?: boolean
}

export function VideoUploader({
  onVideoSelected,
  isEncoding,
  encodeProgress,
  disabled,
}: VideoUploaderProps) {
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setFileName(file.name)
      setFileSize((file.size / 1_048_576).toFixed(1))
      onVideoSelected(file)
    },
    [onVideoSelected]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith('video/')) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const clearVideo = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFileName(null)
    setFileSize(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [previewUrl])

  if (previewUrl && fileName) {
    return (
      <div className="relative rounded-xl border border-border overflow-hidden bg-surface-alt">
        <button
          onClick={clearVideo}
          disabled={disabled}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <video
          src={previewUrl}
          controls
          className="w-full max-h-64 object-contain bg-black"
        />
        <div className="px-4 py-3 flex items-center gap-3">
          <Film className="w-4 h-4 text-text-muted shrink-0" />
          <span className="text-sm text-text-primary truncate">{fileName}</span>
          <span className="text-xs text-text-muted shrink-0">{fileSize} MB</span>
        </div>
        {isEncoding && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
              <span>Encoding video...</span>
              <span>{encodeProgress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${encodeProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={clsx(
        'relative rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors',
        dragOver
          ? 'border-accent bg-accent-subtle'
          : 'border-border hover:border-accent/50 hover:bg-surface-alt'
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/x-matroska,video/quicktime,video/x-msvideo"
        onChange={handleChange}
        className="hidden"
      />
      <Upload className="w-10 h-10 text-text-muted mx-auto mb-3" />
      <p className="text-sm font-medium text-text-primary">
        Drop a video here or click to browse
      </p>
      <p className="text-xs text-text-muted mt-1">
        MP4, WebM, MKV, MOV, AVI up to 500MB
      </p>
    </div>
  )
}
