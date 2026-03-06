import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { toPng } from 'html-to-image'
import ImageUploader from '../components/ImageUploader'
import { getTierLabel, getRatingColor, getProgressPercent } from '../utils/ratings'

const METRICS = [
  { key: 'eyeArea', label: 'Eye Area', default: 6.5 },
  { key: 'jawline', label: 'Jawline', default: 5 },
  { key: 'cheekbones', label: 'Cheekbones', default: 6 },
  { key: 'harmony', label: 'Harmony', default: 5.5 },
] as const

type MetricKey = typeof METRICS[number]['key']

export default function RatingsTemplate() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [ratings, setRatings] = useState<Record<MetricKey, number>>(
    Object.fromEntries(METRICS.map(m => [m.key, m.default])) as Record<MetricKey, number>
  )
  const [overallRating, setOverallRating] = useState(5.8)
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

  const pslTier = getTierLabel(overallRating, 'PSL', gender)

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

  const glowColor = '#E8556D'
  const displayRating = overallRating % 1 === 0 ? overallRating.toString() : overallRating.toFixed(1)

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
                background: '#1C1C1E',
                border: `6px solid ${glowColor}88`,
                borderRadius: 40,
                boxSizing: 'border-box',
                transform: 'scale(0.3333)',
                transformOrigin: 'top left',
              }}
            >
              {/* Card container with neon glow border */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 0,
                  boxShadow: `inset 0 0 20px ${glowColor}15, inset 0 0 60px ${glowColor}08`,
                  background: '#1C1C1E',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '120px 80px 80px',
                }}
              >
                {/* Logo above image */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    background: '#1C1C1E',
                    padding: '14px 28px',
                    borderRadius: 30,
                    border: '1.5px solid rgba(232, 85, 109, 0.4)',
                    marginBottom: 48,
                  }}
                >
                  <img src="/logo.png" alt="MogMaxx" style={{ width: 57, height: 57, borderRadius: 13, background: '#000' }} />
                  <span style={{ color: '#ffffff', fontSize: 48, fontWeight: 800, letterSpacing: 2 }}>MOGMAXX</span>
                  <img
                    src="/app-store-icon.svg"
                    alt="App Store"
                    style={{
                      width: 57,
                      height: 57,
                      borderRadius: 13,
                    }}
                  />
                </div>

                {/* Hexagonal image frame */}
                <div style={{ position: 'relative', width: 532, height: 532, marginBottom: 48 }}>
                  {/* SVG hex border with neon glow via drop-shadow */}
                  <svg
                    viewBox="0 0 532 532"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      overflow: 'visible',
                      filter: `
                        drop-shadow(0 0 6px ${glowColor})
                        drop-shadow(0 0 15px ${glowColor}aa)
                        drop-shadow(0 0 35px ${glowColor}66)
                        drop-shadow(0 0 70px ${glowColor}33)
                      `,
                      zIndex: 1,
                    }}
                  >
                    <polygon
                      points="266,3 494,136 494,399 266,532 37,399 37,136"
                      fill="none"
                      stroke={glowColor}
                      strokeWidth="5"
                    />
                  </svg>
                  {/* Hex image */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <ImageUploader
                      imageUrl={imageUrl}
                      onImageChange={setImageUrl}
                      size={532}
                      shape="hexagon"
                      className="!bg-transparent !border-0"
                    />
                  </div>
                </div>

                {/* PSL Rating number */}
                <div
                  style={{
                    fontSize: 200,
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1,
                    textShadow: `
                      0 0 10px ${glowColor},
                      0 0 20px ${glowColor},
                      0 0 40px ${glowColor}cc,
                      0 0 80px ${glowColor}88,
                      0 0 120px ${glowColor}44
                    `,
                    letterSpacing: -4,
                  }}
                >
                  {displayRating}
                </div>

                {/* Tier label */}
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 600,
                    color: '#ffffffaa',
                    letterSpacing: 18,
                    textTransform: 'uppercase',
                    marginTop: 12,
                  }}
                >
                  {pslTier}
                </div>

                {/* Metric stat cards — 2x2 grid */}
                <div style={{ width: '100%', marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
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
                          background: 'linear-gradient(145deg, #252528 0%, #1e1e21 100%)',
                          border: `1.5px solid ${glowColor}55`,
                          borderRadius: 28,
                          padding: '44px 40px 40px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 20,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4), 0 0 12px ${glowColor}22, 0 0 30px ${glowColor}11`,
                        }}
                      >
                        {/* Label */}
                        <div
                          style={{
                            fontSize: 34,
                            fontWeight: 700,
                            color: '#ffffffcc',
                            letterSpacing: 5,
                            textTransform: 'uppercase',
                          }}
                        >
                          {m.label}
                        </div>
                        {/* Score + dot + tier */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <span style={{ fontSize: 80, fontWeight: 800, color: metricColor, lineHeight: 1 }}>
                            {displayVal}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.55)', fontSize: 30, fontWeight: 500 }}>
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
                        <div style={{ position: 'relative', width: '100%', height: 18, marginTop: 4 }}>
                          {/* Track */}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(255,255,255,0.06)',
                              borderRadius: 9,
                            }}
                          />
                          {/* Glow bleed */}
                          <div
                            style={{
                              position: 'absolute',
                              top: -4,
                              bottom: -4,
                              left: 0,
                              width: `${pct}%`,
                              borderRadius: 14,
                              background: metricColor,
                              filter: 'blur(10px)',
                              opacity: 0.4,
                            }}
                          />
                          {/* Fill */}
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              bottom: 0,
                              left: 0,
                              width: `${pct}%`,
                              borderRadius: 9,
                              background: `linear-gradient(90deg, ${metricColor}cc, ${metricColor})`,
                              boxShadow: `0 0 10px ${metricColor}66`,
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

            {/* Overall rating slider */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold">Overall Rating</label>
                <input
                  type="number"
                  value={overallRating.toFixed(1)}
                  onChange={(e) => setOverallRating(Math.max(1, Math.min(8, parseFloat(e.target.value) || 1)))}
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
                value={overallRating}
                onChange={(e) => setOverallRating(parseFloat(e.target.value))}
              />
            </div>

            <div className="border-t border-white/10 my-4" />

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
