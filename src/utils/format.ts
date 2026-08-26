import type { Currency } from '@/types/pricing'

const CURRENCY_LOCALE: Record<Currency, string> = {
  USD: 'en-US',
  PKR: 'en-PK',
}

export function formatCurrency(amount: number, currency: Currency, fractionDigits = 0): string {
  if (!Number.isFinite(amount)) return '—'
  try {
    return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
      style: 'currency',
      currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(amount)
  } catch {
    // Fallback if the environment lacks the currency's Intl data.
    return `${currency} ${amount.toFixed(fractionDigits)}`
  }
}

export function formatNumber(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}

export function formatPercent(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return '—'
  return `${value.toFixed(fractionDigits)}%`
}

export function convertUsdToPkr(amountUsd: number, usdToPkrRate: number): number {
  return amountUsd * usdToPkrRate
}
