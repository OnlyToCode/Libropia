"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { BookOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/libros?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const scrollToGeneros = (e: React.MouseEvent) => {
    e.preventDefault()

    // If we're not on the home page, navigate to home first
    if (pathname !== "/") {
      router.push("/")

      // We need to wait for navigation to complete before scrolling
      // This is a simple approach - in a real app you might want to use
      // a more sophisticated method to detect when navigation is complete
      setTimeout(() => {
        const generosSection = document.getElementById("generos")
        if (generosSection) {
          generosSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    } else {
      // If we're already on the home page, just scroll
      const generosSection = document.getElementById("generos")
      if (generosSection) {
        generosSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-6 w-6" />
            <span>Libropia</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/libros" className="text-sm font-medium hover:underline underline-offset-4">
              Libros
            </Link>
            <a
              href="/#generos"
              className="text-sm font-medium hover:underline underline-offset-4 cursor-pointer"
              onClick={scrollToGeneros}
            >
              Géneros
            </a>
            <Link href="/novedades" className="text-sm font-medium hover:underline underline-offset-4">
              Novedades
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Barra de búsqueda para escritorio */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por título, autor o ISBN..."
              className="w-[200px] lg:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Icono de búsqueda para móvil */}
          <Link href="/buscar" className="md:hidden">
            <Button variant="outline" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          </Link>

          <Link href="/carrito">
            <Button variant="outline" size="icon" className="relative">
              <BookOpen className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/registro" className="hidden md:block">
            <Button size="sm">Registrarse</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

