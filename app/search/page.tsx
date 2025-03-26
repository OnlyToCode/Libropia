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
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-center">Buscar Productos</h1>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="¿Qué estás buscando?"
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
                <Link href="/products?q=auriculares">
                  <Button variant="outline" size="sm">
                    Auriculares
                  </Button>
                </Link>
                <Link href="/products?q=camiseta">
                  <Button variant="outline" size="sm">
                    Camisetas
                  </Button>
                </Link>
                <Link href="/products?q=zapatillas">
                  <Button variant="outline" size="sm">
                    Zapatillas
                  </Button>
                </Link>
                <Link href="/products?q=reloj">
                  <Button variant="outline" size="sm">
                    Relojes
                  </Button>
                </Link>
                <Link href="/products?q=laptop">
                  <Button variant="outline" size="sm">
                    Laptops
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Categorías populares</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/products?q=electrónica" className="group">
                  <div className="border rounded-lg p-4 transition-colors hover:bg-muted">
                    <h3 className="font-medium">Electrónica</h3>
                    <p className="text-sm text-muted-foreground">Auriculares, laptops y más</p>
                  </div>
                </Link>
                <Link href="/products?q=ropa" className="group">
                  <div className="border rounded-lg p-4 transition-colors hover:bg-muted">
                    <h3 className="font-medium">Ropa</h3>
                    <p className="text-sm text-muted-foreground">Camisetas, pantalones y más</p>
                  </div>
                </Link>
                <Link href="/products?q=calzado" className="group">
                  <div className="border rounded-lg p-4 transition-colors hover:bg-muted">
                    <h3 className="font-medium">Calzado</h3>
                    <p className="text-sm text-muted-foreground">Zapatillas, zapatos y más</p>
                  </div>
                </Link>
                <Link href="/products?q=accesorios" className="group">
                  <div className="border rounded-lg p-4 transition-colors hover:bg-muted">
                    <h3 className="font-medium">Accesorios</h3>
                    <p className="text-sm text-muted-foreground">Relojes, bolsos y más</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">TiendaReact © 2024</span>
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

