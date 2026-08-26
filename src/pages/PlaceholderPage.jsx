export function PlaceholderPage({ title, description, step }) {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="font-display text-2xl font-semibold text-(--color-ink)">
        {title}
      </h1>
      <p className="mt-3 text-(--color-ink-secondary)">{description}</p>
      <p className="mt-6 inline-block rounded-full border border-(--color-border) bg-(--color-surface-sunken) px-4 py-1.5 text-xs font-medium text-(--color-ink-muted)">
        {step}
      </p>
    </div>
  )
}
