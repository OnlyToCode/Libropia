import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturedProducts() {
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
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Productos Destacados</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Descubre nuestros productos más populares y mejor valorados.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
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
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/products">
            <Button variant="outline">Ver Todos los Productos</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

