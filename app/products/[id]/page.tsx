"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Minus, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  // En una aplicación real, estos datos vendrían de una API o base de datos
  // Simulamos un producto basado en el ID
  const product = {
    id: productId,
    name: "Auriculares Bluetooth Premium",
    price: 89.99,
    description:
      "Auriculares inalámbricos con cancelación de ruido activa, batería de larga duración y sonido de alta fidelidad. Perfectos para viajes, trabajo o uso diario.",
    features: [
      "Cancelación de ruido activa",
      "30 horas de batería",
      "Conexión Bluetooth 5.0",
      "Micrófono incorporado",
      "Controles táctiles",
      "Resistente al agua IPX4",
    ],
    specifications: {
      Marca: "AudioTech",
      Modelo: "BT-500",
      Color: "Negro",
      Peso: "280g",
      Conectividad: "Bluetooth 5.0, Cable 3.5mm",
      Batería: "500mAh, 30 horas de reproducción",
    },
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    rating: 4.5,
    reviews: 128,
    stock: 15,
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const addToCart = () => {
    toast({
      title: "Añadido al carrito",
      description: `${quantity} x ${product.name} añadido a tu carrito`,
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
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {product.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border cursor-pointer">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Vista ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : i < product.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reseñas)
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Impuestos incluidos. Envío calculado en el checkout.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm">{product.description}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Cantidad</span>
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={increaseQuantity}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{product.stock} unidades disponibles</p>
                </div>
                <Button className="w-full" size="lg" onClick={addToCart}>
                  Añadir al Carrito
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full border-b rounded-none justify-start">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <h3 className="font-semibold text-lg">Características</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="pt-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Especificaciones Técnicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Reseñas de Clientes</h3>
                    <Button>Escribir una Reseña</Button>
                  </div>
                  <p>Próximamente: Reseñas de clientes para este producto.</p>
                </div>
              </TabsContent>
            </Tabs>
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

