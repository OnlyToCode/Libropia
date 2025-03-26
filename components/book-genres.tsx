import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function BookGenres() {
  // En una aplicación real, estos datos vendrían de una API o base de datos
  const genres = [
    {
      id: 1,
      name: "Ficción Literaria",
      image: "/placeholder.svg?height=200&width=200",
      count: 42,
    },
    {
      id: 2,
      name: "No Ficción",
      image: "/placeholder.svg?height=200&width=200",
      count: 56,
    },
    {
      id: 3,
      name: "Ciencia Ficción",
      image: "/placeholder.svg?height=200&width=200",
      count: 38,
    },
    {
      id: 4,
      name: "Infantil y Juvenil",
      image: "/placeholder.svg?height=200&width=200",
      count: 24,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Géneros Literarios</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explora nuestra colección por géneros y encuentra tu próxima lectura favorita.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {genres.map((genre) => (
            <Link key={genre.id} href={`/generos/${genre.id}`}>
              <Card className="overflow-hidden transition-all hover:scale-105">
                <img src={genre.image || "/placeholder.svg"} alt={genre.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{genre.name}</h3>
                </CardContent>
                <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">{genre.count} libros</CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

