import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function FeaturedBooks() {
  // En una aplicación real, estos datos vendrían de una API o base de datos
  const books = [
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Realismo mágico",
      isNew: false,
      isReservable: true,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      price: 19.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Distopía",
      isNew: false,
      isReservable: true,
    },
    {
      id: 3,
      title: "El principito",
      author: "Antoine de Saint-Exupéry",
      price: 15.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Literatura infantil",
      isNew: false,
      isReservable: true,
    },
    {
      id: 4,
      title: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      price: 22.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Misterio",
      isNew: true,
      isReservable: true,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Libros Destacados</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Descubre nuestras recomendaciones literarias y los títulos más populares.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <div className="relative">
                  <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-48 object-cover" />
                  {book.isNew && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Novedad</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-sm text-muted-foreground mt-1">{book.genre}</p>
                <p className="font-bold mt-2">${book.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Link href={`/libros/${book.id}`}>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </Link>
                {book.isReservable ? <Button size="sm">Reservar</Button> : <Button size="sm">Comprar</Button>}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/libros">
            <Button variant="outline">Ver Catálogo Completo</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

