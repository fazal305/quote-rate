import { Link } from 'react-router-dom'

import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { QUOTE_STATUS_LABELS, useQuoteHistoryStore } from '@/store/quoteHistoryStore'
import { formatCurrency } from '@/utils/format'

const STATUS_STYLES = {
  draft: 'bg-(--color-surface-sunken) text-(--color-ink-muted)',
  prepared: 'bg-(--color-accent-soft) text-(--color-accent-strong)',
  sent: 'bg-(--color-gold-soft) text-(--color-gold)',
  accepted: 'bg-(--color-success-soft) text-(--color-success)',
  rejected: 'bg-(--color-danger-soft) text-(--color-danger)',
  expired: 'bg-(--color-surface-sunken) text-(--color-ink-muted)',
}

export function QuoteHistoryPage() {
  const quotes = useQuoteHistoryStore((s) => s.quotes)
  const updateStatus = useQuoteHistoryStore((s) => s.updateStatus)
  const deleteQuote = useQuoteHistoryStore((s) => s.deleteQuote)

  return (
    <>
      <PageHeader
        title="Quote History"
        description="Every quote you've saved from the calculator."
        actions={
          <Link
            to="/"
            className="rounded-(--radius-token-sm) bg-(--color-accent) px-4 py-2 text-sm font-medium text-(--color-accent-ink) transition-opacity hover:opacity-90"
          >
            New Quote
          </Link>
        }
      />

      {quotes.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm text-(--color-ink-secondary)">
            No quotes saved yet. Build one in the Calculator, then save it here.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <Card key={q.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tabular text-xs font-medium text-(--color-ink-muted)">{q.quoteNumber}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[q.status]}`}
                  >
                    {QUOTE_STATUS_LABELS[q.status]}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm font-medium text-(--color-ink)">{q.projectTitle}</p>
                <p className="truncate text-xs text-(--color-ink-secondary)">{q.clientName}</p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <p className="tabular text-sm font-semibold text-(--color-ink)">
                  {formatCurrency(q.pricing.recommendedQuote, 'USD', 0)}
                </p>
                <select
                  aria-label={`Status for ${q.projectTitle}`}
                  value={q.status}
                  onChange={(e) => updateStatus(q.id, e.target.value)}
                  className="rounded-(--radius-token-sm) border border-(--color-border) bg-(--color-surface) px-2 py-1.5 text-xs text-(--color-ink)"
                >
                  {Object.entries(QUOTE_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => deleteQuote(q.id)}
                  aria-label={`Delete quote for ${q.projectTitle}`}
                  className="rounded-(--radius-token-sm) px-2 py-1.5 text-xs font-medium text-(--color-danger) hover:bg-(--color-danger-soft)"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
