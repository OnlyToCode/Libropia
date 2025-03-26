import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Descubre mundos infinitos entre páginas
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              En Libropia encontrarás los mejores libros para comprar o reservar. Desde clásicos atemporales hasta las
              últimas novedades literarias.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/libros">
                <Button size="lg">Explorar Catálogo</Button>
              </Link>
              <Link href="/registro">
                <Button variant="outline" size="lg">
                  Crear Cuenta
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              alt="Biblioteca con estanterías llenas de libros"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="550"
              src="/placeholder.svg?height=550&width=800"
              width="800"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

