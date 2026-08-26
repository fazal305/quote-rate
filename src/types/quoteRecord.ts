import type { QuoteDraft } from '@/types/quote'

export type QuoteStatus = 'draft' | 'prepared' | 'sent' | 'accepted' | 'rejected' | 'expired'

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  draft: 'Draft',
  prepared: 'Prepared',
  sent: 'Sent',
  accepted: 'Accepted',
  rejected: 'Rejected',
  expired: 'Expired',
}

export interface PricingSnapshot {
  recommendedQuote: number
  minimumQuote: number
  premiumQuote: number
  totalHours: number
  estimatedWeeksRange: { min: number; max: number }
  currency: 'USD'
}

export interface QuoteRecord {
  id: string
  quoteNumber: string
  projectTitle: string
  clientName: string
  status: QuoteStatus
  createdAt: string
  updatedAt: string
  /** A frozen copy of the calculator draft as it was when saved — editing the live calculator afterward doesn't change this. */
  draft: QuoteDraft
  pricing: PricingSnapshot
}
