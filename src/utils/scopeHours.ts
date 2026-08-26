import { complexityLevels, features, pageTypes, projectTypes } from '@/config/pricingConfig'
import type { QuoteDraft } from '@/types/quote'

export function getProjectType(projectTypeId: string) {
  return projectTypes.find((p) => p.id === projectTypeId) ?? projectTypes[0]
}

export function getComplexity(complexityId: string) {
  return complexityLevels.find((c) => c.id === complexityId) ?? complexityLevels[0]
}

export function getStandardPagesHours(draft: QuoteDraft): number {
  return draft.selectedPages.reduce((sum, sel) => {
    const pageType = pageTypes.find((p) => p.id === sel.pageTypeId)
    if (!pageType) return sum
    return sum + pageType.hours * sel.quantity
  }, 0)
}

export function getCustomPagesHours(draft: QuoteDraft): number {
  return draft.customPages.reduce((sum, p) => sum + p.hoursEach * p.quantity, 0)
}

export function getFeaturesHours(draft: QuoteDraft): number {
  return draft.selectedFeatureIds.reduce((sum, id) => {
    const feature = features.find((f) => f.id === id)
    return feature ? sum + feature.hours : sum
  }, 0)
}

export interface ScopeHoursSummary {
  baseHours: number
  pagesHours: number
  customPagesHours: number
  featuresHours: number
  preComplexityHours: number
  complexityMultiplier: number
  totalHours: number
}

export function getScopeHoursSummary(draft: QuoteDraft): ScopeHoursSummary {
  const projectType = getProjectType(draft.projectTypeId)
  const complexity = getComplexity(draft.complexityId)

  const baseHours = projectType.baseHours
  const pagesHours = getStandardPagesHours(draft)
  const customPagesHours = getCustomPagesHours(draft)
  const featuresHours = getFeaturesHours(draft)

  const preComplexityHours = baseHours + pagesHours + customPagesHours + featuresHours
  const totalHours = preComplexityHours * complexity.multiplier

  return {
    baseHours,
    pagesHours,
    customPagesHours,
    featuresHours,
    preComplexityHours,
    complexityMultiplier: complexity.multiplier,
    totalHours,
  }
}
