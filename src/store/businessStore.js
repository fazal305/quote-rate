import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import {
  defaultBrandingProfile,
  defaultBusinessProfile,
  defaultCurrencyPreferences,
  defaultPricingPhilosophy,
} from '@/config/businessDefaults'

/** Wraps localStorage so a disabled/full/private-mode store degrades to an in-memory no-op instead of crashing the app. */
const safeLocalStorage = {
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
      // Storage unavailable — settings simply won't persist this session.
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

export const useBusinessStore = create()(
  persist(
    (set) => ({
      profile: defaultBusinessProfile,
      currency: defaultCurrencyPreferences,
      branding: defaultBrandingProfile,
      pricingPhilosophy: defaultPricingPhilosophy,
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),
      updateCurrency: (patch) => set((s) => ({ currency: { ...s.currency, ...patch } })),
      updateBranding: (patch) => set((s) => ({ branding: { ...s.branding, ...patch } })),
      setPricingPhilosophy: (value) => set({ pricingPhilosophy: value }),
      resetToDefaults: () =>
        set({
          profile: defaultBusinessProfile,
          currency: defaultCurrencyPreferences,
          branding: defaultBrandingProfile,
          pricingPhilosophy: defaultPricingPhilosophy,
        }),
    }),
    {
      name: 'quoterate.business',
      storage: createJSONStorage(() => safeLocalStorage),
    },
  ),
)
