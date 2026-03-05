import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { toPng } from 'html-to-image'
import ImageUploader from '../components/ImageUploader'
import RatingCard from '../components/RatingCard'

export default function CleanRatingsTemplate() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [psl, setPsl] = useState(5)
  const [potential, setPotential] = useState(7)
  const templateRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImageUrl(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDownloadPng = useCallback(async () => {
    if (!templateRef.current) return
    const dataUrl = await toPng(templateRef.current, {
      width: 1080,
      height: 1080,
      pixelRatio: 1,
    })
    const link = document.createElement('a')
    link.download = 'mogmaxx-rating.png'
    link.href = dataUrl
    link.click()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <Link
        to="/creator"
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-secondary transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </Link>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Template Preview */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="font-heading italic text-3xl font-bold">Template Preview</h1>
          <div
            ref={templateRef}
            className="relative overflow-hidden rounded-lg"
            style={{ width: 540, height: 540, background: '#1C1C1E' }}
          >
            {/* Watermark badge - top left */}
            <div className="absolute bottom-3 right-4 z-10 flex items-center gap-[7px] px-[14px] py-[7px] rounded-[15px] border-[0.75px] border-accent/40" style={{ background: 'rgba(0, 0, 0, 0.65)' }}>
              <img src="/logo.png" alt="MogMaxx" className="w-[22px] h-[22px] rounded-[5px]" />
              <span className="text-white text-[24px] font-[800] tracking-[1px]">MOGMAXX</span>
            </div>

            {/* Image circle */}
            <div className="flex justify-center mt-4">
              <ImageUploader
                imageUrl={imageUrl}
                onImageChange={setImageUrl}
                size={240}
              />
            </div>

            {/* Rating cards */}
            <div className="grid grid-cols-2 gap-4 px-5 mt-5">
              <RatingCard label="PSL" rating={psl} gender={gender} />
              <RatingCard label="POTENTIAL" rating={potential} gender={gender} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-card/80 rounded-xl p-6 w-80" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
            <h2 className="text-xl font-bold mb-4">Customize Ratings</h2>

            {/* Gender toggle */}
            <div className="grid grid-cols-2 gap-1 mb-4 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setGender('male')}
                className={`py-2 rounded-md text-sm font-medium transition-colors ${
                  gender === 'male' ? 'bg-accent text-white' : 'text-secondary hover:text-white'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-2 rounded-md text-sm font-medium transition-colors ${
                  gender === 'female' ? 'bg-accent text-white' : 'text-secondary hover:text-white'
                }`}
              >
                Female
              </button>
            </div>

            {/* Upload */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 rounded-lg bg-white/5 text-sm font-medium mb-6 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Upload Image
            </button>

            {/* PSL slider */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">PSL Rating</label>
                <input
                  type="number"
                  value={psl.toFixed(1)}
                  onChange={(e) => setPsl(Math.max(1, Math.min(8, parseFloat(e.target.value) || 1)))}
                  className="w-16 bg-white/5 rounded-lg px-2 py-1 text-sm text-right"
                  min={1}
                  max={8}
                  step={0.1}
                />
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={0.1}
                value={psl}
                onChange={(e) => setPsl(parseFloat(e.target.value))}
              />
            </div>

            {/* Potential slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Potential</label>
                <input
                  type="number"
                  value={potential.toFixed(1)}
                  onChange={(e) => setPotential(Math.max(1, Math.min(8, parseFloat(e.target.value) || 1)))}
                  className="w-16 bg-white/5 rounded-lg px-2 py-1 text-sm text-right"
                  min={1}
                  max={8}
                  step={0.1}
                />
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={0.1}
                value={potential}
                onChange={(e) => setPotential(parseFloat(e.target.value))}
              />
            </div>

            {/* Download buttons */}
            <button
              onClick={handleDownloadPng}
              className="w-full py-3 rounded-lg bg-accent text-white font-semibold text-sm mb-3 hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              Download Image (.png)
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
            <button className="w-full py-3 rounded-lg bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              Download Video (.mp4)
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </button>
          </div>

          {/* How to Use */}
          <div className="bg-card/80 rounded-xl p-6 w-80" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
            <h2 className="text-xl font-bold mb-3">How to Use</h2>
            <ol className="text-sm text-secondary space-y-3 list-none">
              <li className="flex gap-3">
                <span className="text-accent font-semibold shrink-0">1.</span>
                Upload an image and drag to reposition, scroll to zoom
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold shrink-0">2.</span>
                Adjust PSL and Potential ratings (1-8 scale)
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold shrink-0">3.</span>
                Download creates a 1080x1080 image perfect for social media
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
