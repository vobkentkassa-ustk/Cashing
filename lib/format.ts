export function formatMoney(amount: number, withCurrency = true) {
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return withCurrency ? `${formatted} so‘m` : formatted
}

export function formatCompactMoney(amount: number) {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1).replace('.0', '')} mln`
  if (amount >= 1_000) return `${Math.round(amount / 1_000)} ming`
  return amount.toString()
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split('-')
  return `${d}.${m}.${y}`
}

export function formatDateTime(iso: string) {
  return `${formatDate(iso)} ${iso.slice(11, 16)}`
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
