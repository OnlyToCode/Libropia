import Link from "next/link"
import { FeaturedBooks } from "@/components/featured-books"
import { HeroSection } from "@/components/hero-section"
import { BookGenres } from "@/components/book-genres"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedBooks />
        <BookGenres />
      </main>
      <footer className="border-t py-6 md:py-8 bg-muted/40">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Libropia © 2024 - Tu biblioteca de confianza</span>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link href="#" className="text-xs md:text-sm font-medium hover:underline underline-offset-4">
              Términos
            </Link>
            <Link href="#" className="text-xs md:text-sm font-medium hover:underline underline-offset-4">
              Privacidad
            </Link>
            <Link href="#" className="text-xs md:text-sm font-medium hover:underline underline-offset-4">
              Contacto
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

