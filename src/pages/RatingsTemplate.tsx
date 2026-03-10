import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { toPng } from 'html-to-image'
import ImageUploader from '../components/ImageUploader'
import { getTierLabel, getRatingColor, getProgressPercent } from '../utils/ratings'

const METRICS = [
  { key: 'psl', label: 'PSL', default: 6.5 },
  { key: 'potential', label: 'Potential', default: 8 },
  { key: 'eyes', label: 'Eyes', default: 6.5 },
  { key: 'midface', label: 'Midface', default: 7 },
  { key: 'lowerThird', label: 'Lower Third', default: 7 },
  { key: 'upperThird', label: 'Upper Third', default: 7.5 },
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

  const handleDownloadPng = useCallback(async () => {
    if (!templateRef.current) return
    const options = {
      width: 1080,
      height: 1920,
      pixelRatio: 1,
      cacheBust: true,
      style: {
        transform: 'none',
      },
    }
    // First call warms up image cache in cloned DOM — fixes blank images on mobile
    await toPng(templateRef.current, options)
    const dataUrl = await toPng(templateRef.current, options)
    const link = document.createElement('a')
    link.download = 'mogmaxx-ratings.png'
    link.href = dataUrl
    link.click()
  }, [])

  const glowColor = '#E8556D'

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
          <div className="rounded-lg" style={{ width: 360, height: 640, overflow: 'hidden' }}>
            <div
              ref={templateRef}
              className="relative overflow-hidden flex flex-col items-center"
              style={{
                width: 1080,
                height: 1920,
                background: 'radial-gradient(ellipse at 50% 30%, #30121c 0%, #1c0b10 35%, #0e0508 65%, #050105 100%)',
                border: `5px solid ${glowColor}66`,
                borderRadius: 40,
                boxSizing: 'border-box',
                boxShadow: `inset 0 0 60px rgba(0,0,0,0.5), 0 0 30px ${glowColor}33, 0 0 80px ${glowColor}15`,
                transform: 'scale(0.3333)',
                transformOrigin: 'top left',
              }}
            >
              {/* Card container */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(ellipse at 50% 30%, #30121c 0%, #1c0b10 35%, #0e0508 65%, #050105 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '100px 60px 60px',
                }}
              >
              {/* Warm light source behind profile area */}
              <div
                style={{
                  position: 'absolute',
                  top: 80,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 700,
                  height: 700,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${glowColor}15 0%, ${glowColor}08 40%, transparent 70%)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              {/* Vignette overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.4) 100%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
                {/* Logo above image */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    marginBottom: 40,
                    zIndex: 2,
                  }}
                >
                  <img src="/logo.png" alt="MogMaxx" style={{ width: 74, height: 74, borderRadius: 17, background: '#000' }} />
                  <span style={{ color: '#ffffff', fontSize: 62, fontWeight: 800, letterSpacing: 3 }}>MOGMAXX</span>
                  <img
                    src="/app-store-icon.svg"
                    alt="App Store"
                    style={{
                      width: 74,
                      height: 74,
                      borderRadius: 17,
                    }}
                  />
                </div>

                {/* Circular image frame */}
                <div style={{
                  position: 'relative',
                  width: 624,
                  height: 624,
                  marginBottom: -140,
                  zIndex: 3,
                  borderRadius: '50%',
                  border: `5px solid ${glowColor}`,
                  boxShadow: `0 0 15px ${glowColor}aa, 0 0 40px ${glowColor}55, 0 0 80px ${glowColor}22`,
                }}>
                  <ImageUploader
                    imageUrl={imageUrl}
                    onImageChange={setImageUrl}
                    size={614}
                    shape="circle"
                    className="!border-0"
                  />
                </div>

                {/* Metric stat cards — 3x2 grid */}
                <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignContent: 'start', paddingTop: 80, zIndex: 2 }}>
                  {METRICS.map(m => {
                    const val = ratings[m.key]
                    const pct = getProgressPercent(val)
                    const metricColor = getRatingColor(val)
                    const metricTier = getTierLabel(val, m.label, gender)
                    const displayVal = Number.isInteger(val) ? val.toString() : val.toFixed(1)
                    return (
                      <div
                        key={m.key}
                        style={{
                          background: 'linear-gradient(160deg, #2e1e26 0%, #1e1218 50%, #150d12 100%)',
                          border: `1.5px solid ${glowColor}33`,
                          borderTop: `1.5px solid ${glowColor}55`,
                          borderRadius: 28,
                          padding: '44px 36px 40px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          gap: 14,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${glowColor}18`,
                        }}
                      >
                        {/* Label */}
                        <div
                          style={{
                            fontSize: 32,
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: 5,
                            textTransform: 'uppercase',
                          }}
                        >
                          {m.label}
                        </div>
                        {/* Score + subtitle */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 12 }}>
                          <span style={{ fontSize: 76, fontWeight: 800, color: metricColor, lineHeight: 1 }}>
                            {displayVal}
                          </span>
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              fontSize: 24,
                              fontWeight: 600,
                              color: 'rgba(255,255,255,0.55)',
                              letterSpacing: 1.5,
                              textTransform: 'uppercase',
                            }}
                          >
                            <span
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: '50%',
                                backgroundColor: metricColor,
                                display: 'inline-block',
                                boxShadow: `0 0 6px ${metricColor}aa`,
                              }}
                            />
                            {metricTier}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div style={{ position: 'relative', width: '100%', height: 22, marginTop: 4 }}>
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(255,255,255,0.08)',
                              borderRadius: 11,
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: -5,
                              bottom: -5,
                              left: 0,
                              width: `${pct}%`,
                              borderRadius: 16,
                              background: metricColor,
                              filter: 'blur(14px)',
                              opacity: 0.55,
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              bottom: 0,
                              left: 0,
                              width: `${pct}%`,
                              borderRadius: 11,
                              background: `linear-gradient(90deg, ${metricColor}cc, ${metricColor})`,
                              boxShadow: `0 0 12px ${metricColor}88`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>
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

            {/* Metric sliders */}
            {METRICS.map(m => (
              <div key={m.key} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">{m.label}</label>
                  <input
                    type="number"
                    value={ratings[m.key].toFixed(1)}
                    onChange={(e) => updateRating(m.key, Math.max(1, Math.min(8, parseFloat(e.target.value) || 1)))}
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
                  value={ratings[m.key]}
                  onChange={(e) => updateRating(m.key, parseFloat(e.target.value))}
                />
              </div>
            ))}

            {/* Download button */}
            <button
              onClick={handleDownloadPng}
              className="w-full py-3 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              Download Template (.png)
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
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
                Adjust each facial metric rating (1-8 scale)
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-semibold shrink-0">3.</span>
                PSL average, strongest/weakest are calculated automatically
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
