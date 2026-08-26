import { Link, useParams } from 'react-router-dom'

import { Card } from '@/components/ui/Card'
import { useBusinessStore } from '@/store/businessStore'
import { useQuoteHistoryStore } from '@/store/quoteHistoryStore'
import { buildClientQuoteData } from '@/utils/clientQuote'
import { ClientQuoteView } from '@/features/quotes/ClientQuoteView'

export function ClientQuotePage() {
  const { id } = useParams()
  const record = useQuoteHistoryStore((s) => s.quotes.find((q) => q.id === id))
  const branding = useBusinessStore((s) => s.branding)

  if (!record) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <Card>
          <p className="text-sm text-(--color-ink-secondary)">
            This quote no longer exists — it may have been deleted.
          </p>
          <Link
            to="/quotes"
            className="mt-4 inline-block rounded-(--radius-token-sm) bg-(--color-accent) px-4 py-2 text-sm font-medium text-(--color-accent-ink)"
          >
            Back to Quote History
          </Link>
        </Card>
      </div>
    )
  }

  const data = buildClientQuoteData(record, branding)

  return (
    <div>
      <div className="no-print mb-6 flex items-center justify-between">
        <Link
          to="/quotes"
          className="text-sm font-medium text-(--color-ink-secondary) hover:text-(--color-ink)"
        >
          ← Back to Quote History
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-(--radius-token-sm) border border-(--color-border) px-4 py-2 text-sm font-medium text-(--color-ink) transition-colors hover:border-(--color-border-strong)"
        >
          Print / Save as PDF
        </button>
      </div>

      <ClientQuoteView data={data} />

      <p className="no-print mx-auto mt-6 max-w-3xl text-center text-xs text-(--color-ink-muted)">
        This is the document your client sees — internal pricing details (rate, multipliers, contingency) are
        never shown here.
      </p>
    </div>
  )
}
