/**
 * Central type definitions for the pricing configuration engine.
 * Every number that influences a quote lives in `src/config/*`, typed
 * against these interfaces — never inline in a component.
 */

export type Currency = 'USD' | 'PKR'

export type BreakdownCategory =
  | 'design'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'admin'
  | 'integrations'
  | 'testing'
  | 'deployment'

export const BREAKDOWN_CATEGORY_LABELS: Record<BreakdownCategory, string> = {
  design: 'Design & UX',
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  database: 'Database',
  admin: 'Admin & Dashboard',
  integrations: 'Integrations',
  testing: 'Testing & QA',
  deployment: 'Deployment',
}

export type ComplexityLevel = 'simple' | 'standard' | 'complex' | 'very_complex'

export interface ComplexityDef {
  id: ComplexityLevel
  label: string
  description: string
  multiplier: number
}

export interface ProjectTypeDef {
  id: string
  label: string
  description: string
  /** Baseline hours for setup, design foundation, and deployment before pages/features are added. */
  baseHours: number
  defaultComplexity: ComplexityLevel
  suggestedPageIds: string[]
  suggestedFeatureIds: string[]
}

export interface PageTypeDef {
  id: string
  label: string
  hours: number
  category: BreakdownCategory
}

export type FeatureCategory =
  | 'authentication'
  | 'database'
  | 'admin'
  | 'payments'
  | 'communication'
  | 'integrations'
  | 'advanced'

export const FEATURE_CATEGORY_LABELS: Record<FeatureCategory, string> = {
  authentication: 'Authentication',
  database: 'Database',
  admin: 'Admin',
  payments: 'Payments',
  communication: 'Communication',
  integrations: 'Integrations',
  advanced: 'Advanced',
}

export type FeatureComplexity = 'low' | 'medium' | 'high'

export interface FeatureDef {
  id: string
  label: string
  category: FeatureCategory
  breakdownCategory: BreakdownCategory
  hours: number
  complexity: FeatureComplexity
  description: string
  /** Feature ids this one commonly depends on or pairs with (shown as a suggestion, never auto-forced). */
  relatedFeatureIds?: string[]
}

export interface ExperienceLevelDef {
  id: string
  label: string
  description: string
  /** Multiplier applied to the recommended hourly rate. 1.0 = no adjustment. */
  rateMultiplier: number
}

export interface SpecializationDef {
  id: string
  label: string
  description: string
  /** Additive bonus stacked with other selected specializations, e.g. 0.25 = +25%. */
  rateBonus: number
}

export type MarketPositioning = 'local' | 'international' | 'premium'

export interface MarketPositioningDef {
  id: MarketPositioning
  label: string
  description: string
  rateMultiplier: number
}

export interface UrgencyDef {
  id: string
  label: string
  description: string
  multiplier: number
  timelineImpact: string
}

export interface RevisionConfig {
  includedRounds: number
  hoursPerAdditionalRound: number
}

export type MaintenanceCadence = 'monthly' | 'quarterly' | 'annual'

export interface MaintenancePlanDef {
  id: string
  label: string
  cadence: MaintenanceCadence
  description: string
  hoursPerCycle: number
  includes: string[]
}

export type HostingCostType = 'one_time' | 'recurring'

export interface HostingItemDef {
  id: string
  label: string
  type: HostingCostType
  cadence?: 'monthly' | 'annual'
  price: number
  currency: Currency
  description: string
}

export interface ContingencyOption {
  id: string
  label: string
  percent: number
  description: string
}

/** How the baseline project hours (setup/scaffolding) split across breakdown categories. Must sum to 1. */
export interface BaseHoursSplit {
  design: number
  frontend: number
  deployment: number
}

/** How far the Minimum/Premium tiers sit from the Recommended quote. */
export interface QuoteRangeConfig {
  minimumFactor: number
  premiumFactor: number
}

export interface PricingConfig {
  projectTypes: ProjectTypeDef[]
  complexityLevels: ComplexityDef[]
  pageTypes: PageTypeDef[]
  features: FeatureDef[]
  experienceLevels: ExperienceLevelDef[]
  specializations: SpecializationDef[]
  marketPositioning: MarketPositioningDef[]
  urgencyLevels: UrgencyDef[]
  revisions: RevisionConfig
  maintenancePlans: MaintenancePlanDef[]
  hostingItems: HostingItemDef[]
  contingencyOptions: ContingencyOption[]
  defaultContingencyPercent: number
  baseHoursSplit: BaseHoursSplit
  testingPercentOfDevHours: number
  quoteRange: QuoteRangeConfig
}
