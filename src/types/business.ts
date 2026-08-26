export type ThemePreference = 'light' | 'dark' | 'system'

export interface BusinessProfile {
  /** DEVELOPMENT DEFAULT — every field here is editable in Settings. */
  freelancerName: string
  location: string
  experienceLevelId: string
  desiredMonthlyIncomeUsd: number
  monthlyExpensesUsd: number
  taxRatePercent: number
  equipmentMonthlyUsd: number
  workspaceMonthlyUsd: number
  profitMarginPercent: number
  billableHoursPerMonth: number
  desiredHourlyRateUsd: number
}

export interface CurrencyPreferences {
  primaryCurrency: 'USD' | 'PKR'
  secondaryCurrency: 'USD' | 'PKR'
  /** Used only when the live exchange-rate API is unreachable. Editable — not live data. */
  fallbackUsdToPkr: number
  useLiveRates: boolean
}

export type PricingPhilosophy = 'conservative' | 'market_average' | 'premium'

export interface BrandingProfile {
  companyOrFreelancerName: string
  tagline: string
  email: string
  phone: string
  website: string
  address: string
  paymentDetails: string
  defaultTermsAndConditions: string
  defaultValidityDays: number
  defaultRevisionPolicy: string
  logoDataUrl: string | null
}
