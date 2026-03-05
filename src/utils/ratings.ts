export function getTierLabel(rating: number, metric: string, gender: 'male' | 'female'): string {
  const r = Math.round(rating)
  if (r <= 1) return 'Subhuman'
  if (r === 2) return 'Ugly'
  if (r === 3) return 'Below Average'
  if (r === 4) return 'Average'
  if (r === 5) return gender === 'male' ? 'High-Tier Normie' : 'High-Tier Normie'
  if (r === 6) return 'Good'
  if (r === 7) return metric.toUpperCase() === 'POTENTIAL' || metric.toUpperCase() === 'PSL' ? 'Chad' : 'Excellent'
  return 'Top Tier'
}

export function getRatingColor(rating: number): string {
  const r = Math.round(rating)
  if (r <= 2) return '#ef4444' // red
  if (r === 3) return '#f97316' // orange
  if (r <= 4) return '#f59e0b' // amber/orange
  if (r <= 5) return '#eab308' // yellow
  if (r === 6) return '#22c55e' // green
  if (r === 7) return '#06b6d4' // cyan
  return '#75fff1' // bright cyan/teal
}

export function getDotColor(rating: number): string {
  return getRatingColor(rating)
}

export function getProgressPercent(rating: number): number {
  return (rating / 8) * 100
}
