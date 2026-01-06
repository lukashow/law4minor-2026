export default function Page({ is404 }: { is404?: boolean }) {
  if (is404) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-paper)]">
        <h1 className="font-serif text-6xl font-bold text-[var(--color-accent)] mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-paper)]">
      <h1 className="font-serif text-4xl font-bold text-[var(--color-accent)] mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-8">An error occurred while loading this page.</p>
      <a href="/" className="btn btn-primary">Go Home</a>
    </div>
  )
}
