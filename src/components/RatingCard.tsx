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
    <div className={`bg-card/80 border border-accent/30 rounded-lg flex flex-col ${lg ? 'p-8 gap-2' : 'p-4 gap-1'}`}>
      <div className={`text-accent font-bold tracking-wider uppercase ${lg ? 'text-2xl' : 'text-xs'}`}>{label}</div>
      <div className={`flex items-baseline ${lg ? 'gap-3' : 'gap-2'}`}>
        <span className={`font-bold ${lg ? 'text-7xl' : 'text-3xl'}`}>{displayRating}</span>
        <span className={`rounded-full shrink-0 relative top-[-2px] ${lg ? 'w-4 h-4' : 'w-2 h-2'}`} style={{ backgroundColor: color }} />
        <span className={`text-secondary ${lg ? 'text-2xl' : 'text-sm'}`}>{tier}</span>
      </div>
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${lg ? 'h-3 mt-2' : 'h-2 mt-1'}`}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
