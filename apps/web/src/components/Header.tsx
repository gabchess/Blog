import { Button } from '@workspace/ui/components/button'
import { useTheme } from '../hooks/use-theme'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
        <a href="/" className="text-lg font-semibold tracking-tight text-foreground">
          Octant
        </a>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </Button>
      </div>
    </header>
  )
}
