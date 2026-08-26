import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'

import type { QuoteDraft } from '@/types/quote'
import type { PricingSnapshot, QuoteRecord, QuoteStatus } from '@/types/quoteRecord'

const safeLocalStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value)
    } catch {
      // Storage unavailable — saved quotes won't persist this session.
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name)
    } catch {
      // no-op
    }
  },
}

function generateQuoteId(): string {
  return `qr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

interface QuoteHistoryState {
  quotes: QuoteRecord[]
  nextQuoteSequence: number
  saveQuote: (params: {
    projectTitle: string
    clientName: string
    draft: QuoteDraft
    pricing: PricingSnapshot
  }) => QuoteRecord
  updateStatus: (id: string, status: QuoteStatus) => void
  deleteQuote: (id: string) => void
}

export function formatQuoteNumber(sequence: number): string {
  const year = new Date().getFullYear()
  return `Q-${year}-${String(sequence).padStart(4, '0')}`
}

export const useQuoteHistoryStore = create<QuoteHistoryState>()(
  persist(
    (set, get) => ({
      quotes: [],
      nextQuoteSequence: 1,

      saveQuote: ({ projectTitle, clientName, draft, pricing }) => {
        const now = new Date().toISOString()
        const sequence = get().nextQuoteSequence
        const record: QuoteRecord = {
          id: generateQuoteId(),
          quoteNumber: formatQuoteNumber(sequence),
          projectTitle: projectTitle || 'Untitled Project',
          clientName: clientName || 'Unnamed Client',
          status: 'draft',
          createdAt: now,
          updatedAt: now,
          draft,
          pricing,
        }
        set((s) => ({ quotes: [record, ...s.quotes], nextQuoteSequence: s.nextQuoteSequence + 1 }))
        return record
      },

      updateStatus: (id, status) =>
        set((s) => ({
          quotes: s.quotes.map((q) =>
            q.id === id ? { ...q, status, updatedAt: new Date().toISOString() } : q,
          ),
        })),

      deleteQuote: (id) => set((s) => ({ quotes: s.quotes.filter((q) => q.id !== id) })),
    }),
    {
      name: 'quoterate.quotes',
      storage: createJSONStorage(() => safeLocalStorage),
    },
  ),
)
