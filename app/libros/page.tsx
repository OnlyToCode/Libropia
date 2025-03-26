import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"

export default function BooksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // En una aplicación real, estos datos vendrían de una API o base de datos
  const books = [
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Realismo mágico",
      publisher: "Editorial Sudamericana",
      year: 1967,
      isbn: "9780307474728",
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
      publisher: "Debolsillo",
      year: 1949,
      isbn: "9780451524935",
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
      publisher: "Salamandra",
      year: 1943,
      isbn: "9788498381498",
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
      publisher: "Planeta",
      year: 2001,
      isbn: "9788408043645",
      isNew: true,
      isReservable: true,
    },
    {
      id: 5,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      price: 29.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Clásico",
      publisher: "Cátedra",
      year: 1605,
      isbn: "9788437622989",
      isNew: false,
      isReservable: true,
    },
    {
      id: 6,
      title: "Harry Potter y la piedra filosofal",
      author: "J.K. Rowling",
      price: 18.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Fantasía",
      publisher: "Salamandra",
      year: 1997,
      isbn: "9788478884452",
      isNew: false,
      isReservable: true,
    },
    {
      id: 7,
      title: "Crimen y castigo",
      author: "Fiódor Dostoyevski",
      price: 21.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Clásico",
      publisher: "Alianza",
      year: 1866,
      isbn: "9788420674057",
      isNew: false,
      isReservable: true,
    },
    {
      id: 8,
      title: "El código Da Vinci",
      author: "Dan Brown",
      price: 17.99,
      image: "/placeholder.svg?height=200&width=200",
      genre: "Thriller",
      publisher: "Booket",
      year: 2003,
      isbn: "9788408175727",
      isNew: true,
      isReservable: true,
    },
  ]

  // Filtrar libros por término de búsqueda
  const searchQuery = typeof searchParams.q === "string" ? searchParams.q.toLowerCase() : ""
  const filteredBooks = searchQuery
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery) ||
          book.author.toLowerCase().includes(searchQuery) ||
          book.isbn.includes(searchQuery) ||
          book.genre.toLowerCase().includes(searchQuery),
      )
    : books

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="w-full md:w-64 space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Filtros</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Género</h3>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los géneros" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los géneros</SelectItem>
                        <SelectItem value="realismo-magico">Realismo mágico</SelectItem>
                        <SelectItem value="distopia">Distopía</SelectItem>
                        <SelectItem value="infantil">Literatura infantil</SelectItem>
                        <SelectItem value="misterio">Misterio</SelectItem>
                        <SelectItem value="clasico">Clásico</SelectItem>
                        <SelectItem value="fantasia">Fantasía</SelectItem>
                        <SelectItem value="thriller">Thriller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Precio</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="Min" />
                      <Input type="number" placeholder="Max" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Disponibilidad</h3>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="compra">Disponible para compra</SelectItem>
                        <SelectItem value="reserva">Disponible para reserva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Aplicar Filtros</Button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  {searchQuery ? `Resultados para "${searchQuery}"` : "Catálogo de Libros"}
                </h1>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="newest">Más Recientes</SelectItem>
                    <SelectItem value="title">Título: A-Z</SelectItem>
                    <SelectItem value="author">Autor: A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <Card key={book.id} className="overflow-hidden flex flex-col">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <img
                            src={book.image || "/placeholder.svg"}
                            alt={book.title}
                            className="w-full h-48 object-cover"
                          />
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
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h2 className="text-xl font-semibold mb-2">No se encontraron libros</h2>
                    <p className="text-muted-foreground mb-6">
                      No hay libros que coincidan con "{searchQuery}". Intenta con otra búsqueda.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Siguiente
                  </Button>
                </div>
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

