export function Footer() {
  const year = new Date().getFullYear()

  const links = [
    { label: 'About', href: 'https://octant.build' },
    { label: 'App', href: 'https://octant.app' },
    { label: 'GitHub', href: 'https://github.com/golemfoundation' },
    { label: 'X', href: 'https://x.com/OctantApp' },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">&copy; {year} Octant</p>
        <nav className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
