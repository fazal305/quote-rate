import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { HourlyRateCalculator } from '@/features/calculator/HourlyRateCalculator'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route
          path="/"
          element={
            <PlaceholderPage
              title="Project Calculator"
              description="Build a structured price estimate from project scope, features, and complexity."
              step="Arriving in Step 5–7 (Scope, Features, Calculation Engine)"
            />
          }
        />
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
              step="Arriving in Step 8"
            />
          }
        />
        <Route
          path="/quotes"
          element={
            <PlaceholderPage
              title="Quote History"
              description="Every saved quote — draft, sent, accepted, or expired — in one place."
              step="Arriving in Step 9, 12"
            />
          }
        />
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
