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
      className={`bg-card/80 rounded-xl flex flex-col ${lg ? 'p-8 gap-3' : 'p-5 gap-2'}`}
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
    >
      <div className={`text-secondary font-semibold tracking-wider uppercase ${lg ? 'text-xl' : 'text-[11px]'}`}>{label}</div>
      <div className={`flex items-baseline ${lg ? 'gap-4' : 'gap-2.5'}`}>
        <span className={`font-bold ${lg ? 'text-7xl' : 'text-4xl'}`} style={{ color }}>{displayRating}</span>
        <span className={`text-white/60 font-medium ${lg ? 'text-2xl' : 'text-sm'}`}>{tier}</span>
      </div>
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${lg ? 'h-3 mt-1' : 'h-1.5 mt-1'}`}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
