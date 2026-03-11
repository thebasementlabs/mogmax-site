import { useState, useRef, useCallback } from 'react'
import { upload } from '@vercel/blob/client'

export default function SubmitVideo() {
  const [tiktokUsername, setTiktokUsername] = useState('')
  const [discord, setDiscord] = useState('')
  const [videoLink, setVideoLink] = useState('')
  const [viewCount, setViewCount] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      if (droppedFile.size > 100 * 1024 * 1024) {
        setErrorMessage('File must be under 100MB')
        return
      }
      setFile(droppedFile)
      setErrorMessage('')
    } else {
      setErrorMessage('Please upload a video file')
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      if (!selected.type.startsWith('video/')) {
        setErrorMessage('Please upload a video file')
        return
      }
      if (selected.size > 100 * 1024 * 1024) {
        setErrorMessage('File must be under 100MB')
        return
      }
      setFile(selected)
      setErrorMessage('')
    }
  }

  const validateForm = () => {
    if (!tiktokUsername.trim()) return 'TikTok username is required'
    if (!discord.trim()) return 'Discord username is required'
    if (!videoLink.trim()) return 'Video link is required'
    if (!videoLink.includes('tiktok.com')) return 'Please enter a valid TikTok link'
    if (!viewCount) return 'Please select a view count'
    if (!file) return 'Please upload your analytics screen recording'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    try {
      setErrorMessage('')

      // Step 1: Upload video to Vercel Blob
      setStatus('uploading')
      const blob = await upload(file!.name, file!, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      })

      // Step 2: Submit form data + blob URL to our API
      setStatus('submitting')
      const response = await fetch('/api/submit-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tiktokUsername: tiktokUsername.trim().replace(/^@/, ''),
          discord: discord.trim(),
          videoLink: videoLink.trim(),
          recordingUrl: blob.url,
          viewCount,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Submission failed')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const isSubmitting = status === 'uploading' || status === 'submitting'

  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Submitted!</h2>
          <p className="text-secondary mb-6">
            We'll review your video and reach out on Discord for payout details.
          </p>
          <button
            onClick={() => {
              setStatus('idle')
              setTiktokUsername('')
              setDiscord('')
              setVideoLink('')
              setViewCount('')
              setFile(null)
              setErrorMessage('')
            }}
            className="text-accent hover:underline"
          >
            Submit another video
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6">
        <a href="/" className="text-lg font-bold tracking-tight">
          Mog<span className="text-accent">Maxx</span>
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-2">Submit Your Video</h1>
          <p className="text-secondary mb-4">
            Submit your TikTok video for payout review. Upload a screen recording showing your video's analytics.
          </p>

          <div className="bg-card border border-border rounded-xl p-5 mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">Important</h2>
            <p className="text-secondary text-sm mb-4">
              Your screen recording <span className="text-white font-medium">must</span> show the video's viewer locations. See the example below for what this should look like.
            </p>
            <div className="rounded-lg overflow-hidden border border-border" style={{ maxWidth: 280, margin: '0 auto' }}>
              <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/MzKdSh5MmHk?rel=0&modestbranding=1"
                  title="Example analytics recording"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">TikTok Username</label>
              <input
                type="text"
                value={tiktokUsername}
                onChange={(e) => setTiktokUsername(e.target.value)}
                placeholder="@username"
                disabled={isSubmitting}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Discord</label>
              <input
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                placeholder="username"
                disabled={isSubmitting}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">TikTok Video Link</label>
              <input
                type="url"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="https://www.tiktok.com/@user/video/..."
                disabled={isSubmitting}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">View Count</label>
              <select
                value={viewCount}
                onChange={(e) => setViewCount(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50 appearance-none"
              >
                <option value="" disabled>Select view count</option>
                <option value="25k">25k</option>
                <option value="100k">100k</option>
                <option value="500k">500k</option>
                <option value="1M">1M</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Analytics Screen Recording</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => !isSubmitting && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  dragOver
                    ? 'border-accent bg-accent/10'
                    : file
                    ? 'border-accent/50 bg-card'
                    : 'border-border bg-card hover:border-secondary/50'
                } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {file ? (
                  <div>
                    <svg className="w-8 h-8 mx-auto mb-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white font-medium">{file.name}</p>
                    <p className="text-secondary text-sm mt-1">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <svg className="w-8 h-8 mx-auto mb-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-secondary">Drop your recording here or click to browse</p>
                    <p className="text-secondary/50 text-sm mt-1">Video files up to 100MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Loading state */}
            {isSubmitting && (
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="text-secondary text-sm">
                    {status === 'uploading' ? 'Uploading recording...' : 'Saving submission...'}
                  </span>
                </div>
                {status === 'uploading' && (
                  <div className="mt-3 w-full bg-border rounded-full h-1.5 overflow-hidden">
                    <div className="bg-accent h-1.5 rounded-full animate-pulse w-2/3" />
                  </div>
                )}
              </div>
            )}

            {/* Error */}
            {errorMessage && !isSubmitting && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-white font-semibold rounded-lg py-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Video'}
            </button>
          </form>
        </div>
      </main>

      <footer className="p-6 flex justify-center gap-6">
        <a href="/privacy" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Privacy</a>
        <a href="/support" className="text-[13px] text-secondary/60 hover:text-secondary transition-colors">Support</a>
      </footer>
    </div>
  )
}
