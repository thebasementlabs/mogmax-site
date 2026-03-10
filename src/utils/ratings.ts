export function getTierLabel(rating: number, _metric: string, gender: 'male' | 'female'): string {
  if (gender === 'female') {
    if (rating >= 7.75) return 'True Eve'
    if (rating >= 7) return 'Evelite'
    if (rating >= 6) return 'Stacy'
    if (rating >= 5.5) return 'Stacylite'
    if (rating >= 4.5) return 'HTB'
    if (rating >= 3) return 'MTB'
    if (rating >= 1.5) return 'LTB'
    return 'Subhuman'
  }
  if (rating >= 7.75) return 'True Adam'
  if (rating >= 7) return 'Adamlite'
  if (rating >= 6) return 'Chad'
  if (rating >= 5.5) return 'Chadlite'
  if (rating >= 4.5) return 'HTN'
  if (rating >= 3) return 'MTN'
  if (rating >= 1.5) return 'LTN'
  return 'Subhuman'
}

export function getRatingColor(rating: number): string {
  if (rating >= 7.75) return '#c084fc' // purple - True Adam/Eve
  if (rating >= 7) return '#75fff1' // bright cyan - Gigachad/Giga Stacy
  if (rating >= 6) return '#06b6d4' // cyan - Chad/Stacy
  if (rating >= 5.5) return '#22c55e' // green - Chadlite/Stacylite
  if (rating >= 4.5) return '#eab308' // yellow - HTN/HTB
  if (rating >= 3) return '#f59e0b' // amber - MTN/MTB
  if (rating >= 1.5) return '#f97316' // orange - LTN/LTB
  return '#ef4444' // red - Subhuman
}

export function getDotColor(rating: number): string {
  return getRatingColor(rating)
}

export function getProgressPercent(rating: number): number {
  return (rating / 8) * 100
}
