import { getRatingColor, getTierLabel, getProgressPercent } from '../utils/ratings'

interface RatingCardProps {
  label: string
  rating: number
  gender: 'male' | 'female'
  size?: 'default' | 'lg'
}

export default function RatingCard({ label, rating, gender, size = 'default' }: RatingCardProps) {
  const color = getRatingColor(rating)
  const tier = getTierLabel(rating, label, gender)
  const percent = getProgressPercent(rating)
  const lg = size === 'lg'

  const displayRating = Number.isInteger(rating) ? rating.toString() : rating.toFixed(1)

  return (
    <div
      className={`bg-card/80 border border-border rounded-xl flex flex-col ${lg ? 'p-8 gap-3' : 'p-5 gap-2'}`}
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
    >
      <div className={`text-secondary font-semibold tracking-wider uppercase ${lg ? 'text-xl' : 'text-[11px]'}`}>{label}</div>
      <div className={`flex items-center ${lg ? 'gap-4' : 'gap-2.5'}`}>
        <span className={`font-bold ${lg ? 'text-7xl' : 'text-4xl'}`} style={{ color }}>{displayRating}</span>
        <span
          className={`flex items-center font-medium ${lg ? 'text-2xl gap-2' : 'text-sm gap-1.5'}`}
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <span
            className={`inline-block rounded-full ${lg ? 'w-3 h-3' : 'w-2 h-2'}`}
            style={{ backgroundColor: color }}
          />
          {tier}
        </span>
      </div>
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${lg ? 'h-3 mt-1' : 'h-1.5 mt-1'}`}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  )
}
