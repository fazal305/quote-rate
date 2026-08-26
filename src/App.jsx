import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { AIPricingAssistant } from '@/features/ai/AIPricingAssistant'
import { CalculatorPage } from '@/features/calculator/CalculatorPage'
import { HourlyRateCalculator } from '@/features/calculator/HourlyRateCalculator'
import { ComparisonPage } from '@/features/compare/ComparisonPage'
import { ClientQuotePage } from '@/features/quotes/ClientQuotePage'
import { QuoteHistoryPage } from '@/features/quotes/QuoteHistoryPage'
import { SettingsPage } from '@/features/settings/SettingsPage'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route
          path="/hourly-rate"
          element={
            <>
              <PageHeader
                title="Hourly Rate Calculator"
                description="A sustainable hourly rate from your income target, costs, and realistic billable hours."
              />
              <HourlyRateCalculator />
            </>
          }
        />
        <Route
          path="/ai"
          element={
            <>
              <PageHeader
                title="AI Pricing Assistant"
                description="Turn a plain-language project description into a structured starting point."
              />
              <AIPricingAssistant />
            </>
          }
        />
        <Route
          path="/compare"
          element={
            <>
              <PageHeader
                title="Basic / Standard / Premium"
                description="Three ready-to-present scope tiers for a client conversation."
              />
              <ComparisonPage />
            </>
          }
        />
        <Route path="/quotes" element={<QuoteHistoryPage />} />
        <Route path="/quotes/:id" element={<ClientQuotePage />} />
        <Route
          path="/settings"
          element={
            <>
              <PageHeader
                title="Settings"
                description="Your business profile, branding, currency, and quote defaults — all editable."
              />
              <SettingsPage />
            </>
          }
        />
      </Routes>
    </AppShell>
  )
}

export default App
