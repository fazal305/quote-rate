import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { CalculatorPage } from '@/features/calculator/CalculatorPage'
import { HourlyRateCalculator } from '@/features/calculator/HourlyRateCalculator'
import { QuoteHistoryPage } from '@/features/quotes/QuoteHistoryPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

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
          path="/compare"
          element={
            <PlaceholderPage
              title="Basic / Standard / Premium"
              description="Compare three pricing tiers side by side for a client conversation."
              step="Arriving in Step 8: Comparison Mode"
            />
          }
        />
        <Route path="/quotes" element={<QuoteHistoryPage />} />
        <Route
          path="/settings"
          element={
            <PlaceholderPage
              title="Settings"
              description="Your business economics, branding, and pricing configuration — all editable."
              step="Arriving in Step 15"
            />
          }
        />
      </Routes>
    </AppShell>
  )
}

export default App
