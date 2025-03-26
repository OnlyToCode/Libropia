"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BookOpen, Minus, Plus, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function BookPage() {
  const params = useParams()
  const bookId = params.id
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  // En una aplicación real, estos datos vendrían de una API o base de datos
  // Simulamos un libro basado en el ID
  const book = {
    id: bookId,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    price: 24.99,
    description:
      "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. Es considerada una obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español.",
    publisher: "Editorial Sudamericana",
    year: 1967,
    isbn: "9780307474728",
    pages: 496,
    language: "Español",
    genre: "Realismo mágico",
    synopsis:
      "Cien años de soledad narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. La novela es una obra maestra del realismo mágico, un estilo literario que incorpora elementos fantásticos en un contexto realista. A través de la historia de los Buendía, García Márquez explora temas como la soledad, el amor, la guerra, la política y la naturaleza cíclica del tiempo.",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    rating: 4.8,
    reviews: 1283,
    stock: 15,
    isReservable: true,
    isNew: false,
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < book.stock) {
      setQuantity(quantity + 1)
    }
  }

  const addToCart = () => {
    toast({
      title: "Añadido al carrito",
      description: `${quantity} x ${book.title} añadido a tu carrito`,
    })
  }

  const reserveBook = () => {
    toast({
      title: "Libro reservado",
      description: `Has reservado "${book.title}". Estará disponible para recoger en 24 horas.`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden border">
                <img
                  src={book.images[0] || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {book.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border cursor-pointer">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${book.title} - Vista ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{book.genre}</Badge>
                    {book.isNew && <Badge className="bg-primary text-primary-foreground">Novedad</Badge>}
                  </div>
                  <h1 className="text-3xl font-bold mt-2">{book.title}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{book.author}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {book.publisher}, {book.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(book.rating)
                              ? "fill-primary text-primary"
                              : i < book.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {book.rating} ({book.reviews} reseñas)
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold">${book.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Impuestos incluidos. Envío calculado en el checkout.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm">{book.synopsis}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Cantidad</span>
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button variant="ghost" size="icon" onClick={increaseQuantity} disabled={quantity >= book.stock}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{book.stock} unidades disponibles</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="w-full" size="lg" onClick={addToCart}>
                    Añadir al Carrito
                  </Button>
                  {book.isReservable && (
                    <Button className="w-full" size="lg" variant="outline" onClick={reserveBook}>
                      Reservar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full border-b rounded-none justify-start">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <div className="space-y-4">
                  <p>{book.description}</p>
                  <p>{book.synopsis}</p>
                </div>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Información del libro</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Título</span>
                      <span>{book.title}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Autor</span>
                      <span>{book.author}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Editorial</span>
                      <span>{book.publisher}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Año de publicación</span>
                      <span>{book.year}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">ISBN</span>
                      <span>{book.isbn}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Páginas</span>
                      <span>{book.pages}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Idioma</span>
                      <span>{book.language}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Género</span>
                      <span>{book.genre}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Reseñas de Lectores</h3>
                    <Button>Escribir una Reseña</Button>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt="Avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">María López</h4>
                          <span className="text-sm text-muted-foreground">hace 2 semanas</span>
                        </div>
                        <div className="flex my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < 5 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm">
                          Una obra maestra de la literatura. La forma en que García Márquez entrelaza la realidad con
                          elementos mágicos es fascinante. Los personajes son memorables y la historia te atrapa desde
                          la primera página.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt="Avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Carlos Rodríguez</h4>
                          <span className="text-sm text-muted-foreground">hace 1 mes</span>
                        </div>
                        <div className="flex my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm">
                          Un libro que hay que leer al menos una vez en la vida. La narrativa es compleja pero
                          gratificante. La historia de la familia Buendía te hace reflexionar sobre el destino y las
                          repeticiones de la historia.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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

