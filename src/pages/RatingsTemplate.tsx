import { useState, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toPng } from 'html-to-image'
import ImageUploader from '../components/ImageUploader'
import { getTierLabel, getRatingColor, getProgressPercent } from '../utils/ratings'

const METRICS = [
  { key: 'eyeArea', label: 'Eye Area', default: 6.5 },
  { key: 'jawline', label: 'Jawline', default: 5 },
  { key: 'cheekbones', label: 'Cheekbones', default: 6 },
  { key: 'harmony', label: 'Harmony', default: 5.5 },
  { key: 'dimorphism', label: 'Dimorphism', default: 5 },
  { key: 'skin', label: 'Skin', default: 7 },
  { key: 'hair', label: 'Hair', default: 4 },
] as const

type MetricKey = typeof METRICS[number]['key']

export default function RatingsTemplate() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [ratings, setRatings] = useState<Record<MetricKey, number>>(
    Object.fromEntries(METRICS.map(m => [m.key, m.default])) as Record<MetricKey, number>
  )
  const templateRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateRating = (key: MetricKey, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }))
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImageUrl(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const pslAverage = useMemo(() => {
    const values = METRICS.map(m => ratings[m.key])
    return values.reduce((a, b) => a + b, 0) / values.length
  }, [ratings])

  const pslTier = getTierLabel(pslAverage, 'PSL', gender)

  const topHalo = useMemo(() => {
    let bestLabel: string = METRICS[0].label
    let bestVal = ratings[METRICS[0].key]
    for (const m of METRICS) {
      if (ratings[m.key] > bestVal) { bestVal = ratings[m.key]; bestLabel = m.label }
    }
    return bestLabel
  }, [ratings])

  const topFailo = useMemo(() => {
    let worstLabel: string = METRICS[0].label
    let worstVal = ratings[METRICS[0].key]
    for (const m of METRICS) {
      if (ratings[m.key] < worstVal) { worstVal = ratings[m.key]; worstLabel = m.label }
    }
    return worstLabel
  }, [ratings])

  const handleDownloadPng = useCallback(async () => {
    if (!templateRef.current) return
    const dataUrl = await toPng(templateRef.current, {
      width: 1080,
      height: 1920,
      pixelRatio: 1,
      style: {
        transform: 'none',
      },
    })
    const link = document.createElement('a')
    link.download = 'mogmaxx-ratings.png'
    link.href = dataUrl
    link.click()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 md:p-8">
      <Link
        to="/creator"
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-secondary transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </Link>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 items-start justify-center mt-16">
        {/* Template Preview */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="font-heading italic text-3xl font-bold">Template Preview</h1>
          <div className="border border-white/20 rounded-lg" style={{ width: 360, height: 640, overflow: 'hidden' }}>
            <div
              ref={templateRef}
              className="relative overflow-hidden flex flex-col"
              style={{ width: 1080, height: 1920, background: '#1a1a1a', transform: 'scale(0.3333)', transformOrigin: 'top left' }}
            >
              {/* Logo top left */}
              <div className="flex items-center gap-[14px] px-[60px] pt-[60px]">
                <img src="/logo.png" alt="MogMaxx" className="w-[44px] h-[44px] rounded-[10px]" />
                <span className="text-white/60 text-[36px] font-[700]">@mogmaxx</span>
              </div>

              {/* Header: Photo + PSL Rating */}
              <div className="flex items-center gap-[48px] px-[60px] mt-[60px]">
                <div className="shrink-0">
                  <ImageUploader
                    imageUrl={imageUrl}
                    onImageChange={setImageUrl}
                    size={280}
                  />
                </div>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-white text-[52px] font-[800] tracking-[4px] uppercase">PSL Rating</span>
                  <span className="text-white text-[44px] font-[700] mt-[8px]">
                    &#9733; {pslTier.toUpperCase()} &#9733;
                  </span>
                  <span className="text-white text-[56px] font-[800] mt-[4px]">
                    {pslAverage.toFixed(1)} / 8
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-[60px] mt-[48px]" style={{ borderTop: '3px solid #444' }} />

              {/* Metrics rows */}
              <div className="flex flex-col px-[60px] mt-[40px] gap-[28px]">
                {METRICS.map(m => {
                  const val = ratings[m.key]
                  const color = getRatingColor(val)
                  const pct = getProgressPercent(val)
                  return (
                    <div key={m.key} className="flex items-center gap-[24px]">
                      <span className="text-white text-[40px] font-[600] w-[320px] shrink-0">{m.label}</span>
                      <div className="flex-1 h-[40px] bg-white/10 rounded-[4px] overflow-hidden">
                        <div
                          className="h-full rounded-[4px]"
                          style={{ width: `${pct}%`, backgroundColor: color }}
                        />
                      </div>
                      <span className="text-white text-[44px] font-[800] w-[80px] text-right">{val % 1 === 0 ? val : val.toFixed(1)}</span>
                    </div>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="mx-[60px] mt-[40px]" style={{ borderTop: '3px solid #444' }} />

              {/* Footer: Top Halo / Failo */}
              <div className="flex flex-col px-[60px] mt-[40px] gap-[12px]">
                <span className="text-white text-[38px] font-[600]">Top Halo: {topHalo}</span>
                <span className="text-white text-[38px] font-[600]">Top Failo: {topFailo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-card border border-border rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Customize Ratings</h2>

            {/* Gender toggle */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => setGender('male')}
                className={`py-2 rounded-md text-sm font-medium transition-colors ${
                  gender === 'male' ? 'bg-accent text-white' : 'text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-2 rounded-md text-sm font-medium transition-colors ${
                  gender === 'female' ? 'bg-accent text-white' : 'text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                Female
              </button>
            </div>

            {/* Upload */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 rounded-md border border-border text-sm font-medium mb-6 hover:border-accent/50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Upload Image
            </button>

            {/* Rating sliders */}
            {METRICS.map(m => (
              <div key={m.key} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{m.label}</label>
                  <input
                    type="number"
                    value={ratings[m.key].toFixed(1)}
                    onChange={(e) => updateRating(m.key, Math.max(1, Math.min(8, parseFloat(e.target.value) || 1)))}
                    className="w-16 bg-background border border-border rounded px-2 py-1 text-sm text-right"
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
                  value={ratings[m.key]}
                  onChange={(e) => updateRating(m.key, parseFloat(e.target.value))}
                />
              </div>
            ))}

            {/* PSL average display */}
            <div className="flex justify-between items-center py-3 border-t border-border mt-2">
              <span className="text-sm font-bold">PSL Average</span>
              <span className="text-lg font-bold text-accent">{pslAverage.toFixed(1)} / 8</span>
            </div>

            {/* Download button */}
            <button
              onClick={handleDownloadPng}
              className="w-full py-3 rounded-md bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              Download Template (.png)
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
          </div>

          {/* How to Use */}
          <div className="bg-card border border-border rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-3">How to Use</h2>
            <ol className="text-sm text-secondary space-y-3 list-none">
              <li className="flex gap-3">
                <span className="text-accent font-semibold shrink-0">1.</span>
                Upload an image and drag to reposition, scroll to zoom
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold shrink-0">2.</span>
                Adjust each facial metric rating (1-8 scale)
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold shrink-0">3.</span>
                PSL average, top halo, and top failo are calculated automatically
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold shrink-0">4.</span>
                Download creates a 1080x1920 image perfect for social media
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
