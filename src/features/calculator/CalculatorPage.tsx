import { PageHeader } from '@/components/layout/PageHeader'
import { PricingPositioning } from '@/features/calculator/PricingPositioning'
import { ProjectScopeCalculator } from '@/features/calculator/ProjectScopeCalculator'
import { QuoteSummary } from '@/features/calculator/QuoteSummary'

export function CalculatorPage() {
  return (
    <>
      <PageHeader
        title="Project Calculator"
        description="Scope, features, and positioning — building a transparent, structured estimate."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <ProjectScopeCalculator />
          <PricingPositioning />
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <QuoteSummary />
        </div>
      </div>
    </>
  )
}
