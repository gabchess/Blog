type HeaderProps = Record<string, never>

export function Header(_props: HeaderProps) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
        <span className="text-lg font-semibold tracking-tight text-neutral-900">
          Octant
        </span>
      </div>
    </header>
  )
}
