import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // En una aplicación real, estos datos vendrían de una API o base de datos
  const products = [
    {
      id: 1,
      name: "Camiseta Premium",
      price: 29.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Ropa",
    },
    {
      id: 2,
      name: "Auriculares Bluetooth",
      price: 89.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electrónica",
    },
    {
      id: 3,
      name: "Zapatillas Deportivas",
      price: 79.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Calzado",
    },
    {
      id: 4,
      name: "Reloj Inteligente",
      price: 129.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Accesorios",
    },
    {
      id: 5,
      name: "Laptop Ultradelgada",
      price: 899.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electrónica",
    },
    {
      id: 6,
      name: "Pantalones Vaqueros",
      price: 49.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Ropa",
    },
    {
      id: 7,
      name: "Cámara Digital",
      price: 349.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electrónica",
    },
    {
      id: 8,
      name: "Bolso de Cuero",
      price: 119.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Accesorios",
    },
  ]

  // Filtrar productos por término de búsqueda
  const searchQuery = typeof searchParams.q === "string" ? searchParams.q.toLowerCase() : ""
  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery) || product.category.toLowerCase().includes(searchQuery),
      )
    : products

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
                    <h3 className="text-sm font-medium mb-2">Categoría</h3>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Todas las categorías" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        <SelectItem value="ropa">Ropa</SelectItem>
                        <SelectItem value="electronica">Electrónica</SelectItem>
                        <SelectItem value="calzado">Calzado</SelectItem>
                        <SelectItem value="accesorios">Accesorios</SelectItem>
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
                  <Button className="w-full">Aplicar Filtros</Button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  {searchQuery ? `Resultados para "${searchQuery}"` : "Todos los Productos"}
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
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Link href={`/products/${product.id}`}>
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                        </Link>
                        <Button size="sm">Añadir al Carrito</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h2 className="text-xl font-semibold mb-2">No se encontraron productos</h2>
                    <p className="text-muted-foreground mb-6">
                      No hay productos que coincidan con "{searchQuery}". Intenta con otra búsqueda.
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

