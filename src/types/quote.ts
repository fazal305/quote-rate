import type { ComplexityLevel, MarketPositioning } from '@/types/pricing'

export interface SelectedPage {
  pageTypeId: string
  quantity: number
}

export interface CustomPage {
  id: string
  name: string
  quantity: number
  hoursEach: number
}

export type PaymentStructure = '100_upfront' | '50_50' | '30_40_30' | 'custom'

export interface QuoteDraft {
  id: string
  projectTitle: string
  clientName: string

  projectTypeId: string
  complexityId: ComplexityLevel
  isComplexityManual: boolean

  selectedPages: SelectedPage[]
  customPages: CustomPage[]

  selectedFeatureIds: string[]

  experienceLevelId: string
  specializationIds: string[]
  marketPositioningId: MarketPositioning
  urgencyId: string

  contingencyPercent: number
  additionalRevisionRounds: number

  maintenancePlanId: string | null
  hostingItemIds: string[]

  paymentStructure: PaymentStructure

  createdAt: string
  updatedAt: string
}
