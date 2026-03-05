export function getTierLabel(rating: number, _metric: string, _gender: 'male' | 'female'): string {
  if (rating >= 8) return 'True Adam'
  if (rating >= 7) return 'PSL God'
  if (rating >= 6) return 'Chad'
  if (rating >= 5) return 'Chadlite'
  if (rating >= 4) return 'HTN'
  if (rating >= 3) return 'MTN'
  if (rating >= 2) return 'LTN'
  return 'Subhuman'
}

export function getRatingColor(rating: number): string {
  if (rating >= 8) return '#c084fc' // purple - True Adam
  if (rating >= 7) return '#75fff1' // bright cyan - PSL God
  if (rating >= 6) return '#06b6d4' // cyan - Chad
  if (rating >= 5) return '#22c55e' // green - Chadlite
  if (rating >= 4) return '#eab308' // yellow - HTN
  if (rating >= 3) return '#f59e0b' // amber - MTN
  if (rating >= 2) return '#f97316' // orange - LTN
  return '#ef4444' // red - Subhuman
}

export function getDotColor(rating: number): string {
  return getRatingColor(rating)
}

export function getProgressPercent(rating: number): number {
  return (rating / 8) * 100
}
