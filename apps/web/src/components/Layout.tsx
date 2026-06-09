import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import SEO from './SEO'

type LayoutProps = {
  children: ReactNode
  title: string
  description: string
  /** When true, children manage their own width — used for full-bleed landing sections. */
  fullBleed?: boolean
}

export function Layout({ children, title, description, fullBleed = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO title={title} description={description} />
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-2 focus-visible:top-2 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-background focus-visible:px-3 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className={
          fullBleed
            ? 'w-full flex-1'
            : 'mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-16'
        }
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
