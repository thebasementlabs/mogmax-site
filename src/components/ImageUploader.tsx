import { useRef, useState, useCallback, useEffect } from 'react'

interface ImageUploaderProps {
  onImageChange: (dataUrl: string | null) => void
  imageUrl: string | null
  size?: number
  className?: string
  shape?: 'circle' | 'hexagon'
}

interface Position { x: number; y: number }

const HEX_CLIP = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'

export default function ImageUploader({ onImageChange, imageUrl, size = 240, className = '', shape = 'circle' }: ImageUploaderProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    setScale(s => Math.max(0.5, Math.min(3, s - e.deltaY * 0.002)))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageUrl) return
    setDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }

  const handleMouseUp = () => setDragging(false)

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-white/5 border-2 border-white/10 flex items-center justify-center cursor-move ${shape === 'circle' ? 'rounded-full' : ''} ${className}`}
      style={{ width: size, height: size, ...(shape === 'hexagon' ? { clipPath: HEX_CLIP } : {}) }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="absolute pointer-events-none select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
          }}
          draggable={false}
        />
      ) : (
        <div className="flex flex-col items-center text-white/30 gap-2">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21z" />
          </svg>
          <span className="text-xs">Insert Image Here</span>
        </div>
      )}
    </div>
  )
}
