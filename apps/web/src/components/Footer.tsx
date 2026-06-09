export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <p className="text-sm text-neutral-500">
          &copy; {year} Octant
        </p>
      </div>
    </footer>
  )
}
