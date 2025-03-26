"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/libros?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-center">Buscar Libros</h1>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Título, autor, ISBN..."
                className="w-full pl-8 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full mt-4">
                Buscar
              </Button>
            </form>
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Búsquedas populares</h2>
              <div className="flex flex-wrap gap-2">
                <Link href="/libros?q=garcía márquez">
                  <Button variant="outline" size="sm">
                    García Márquez
                  </Button>
                </Link>
                <Link href="/libros?q=harry potter">
                  <Button variant="outline" size="sm">
                    Harry Potter
                  </Button>
                </Link>
                <Link href="/libros?q=el principito">
                  <Button variant="outline" size="sm">
                    El Principito
                  </Button>
                </Link>
                <Link href="/libros?q=1984">
                  <Button variant="outline" size="sm">
                    1984
                  </Button>
                </Link>
                <Link href="/libros?q=don quijote">
                  <Button variant="outline" size="sm">
                    Don Quijote
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Géneros populares</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/libros?q=realismo mágico" className="group">
                  <div className="border rounded-lg p-4 transition-colors hover:bg-muted">
                    <h3 className="font-medium">Realismo Mágico</h3>
                    <p className="text-sm text-muted-foreground">García Márquez, Allende y más</p>
                  </div>
                </Link>
                <Link href="/libros?q=clásico" className="group">
                  <div className="border rounded-lg p-4 transition-colors hover:bg-muted">
                    <h3 className="font-medium">Clásicos</h3>
                    <p className="text-sm text-muted-foreground">Cervantes, Dostoyevski y más</p>
                  </div>
                </Link>
                <Link href="/libros?q=fantasía" className="group">
                  <div className="border rounded-lg p-4 transition-colors hover:bg-muted">
                    <h3 className="font-medium">Fantasía</h3>
                    <p className="text-sm text-muted-foreground">Rowling, Tolkien y más</p>
                  </div>
                </Link>
                <Link href="/libros?q=distopía" className="group">
                  <div className="border rounded-lg p-4 transition-colors hover:bg-muted">
                    <h3 className="font-medium">Distopía</h3>
                    <p className="text-sm text-muted-foreground">Orwell, Huxley y más</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
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

