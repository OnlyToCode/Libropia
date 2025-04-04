"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"

export default function CartPage() {
  const { toast } = useToast()

  // En una aplicación real, estos datos vendrían de un estado global o contexto
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Auriculares Bluetooth Premium",
      price: 89.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: 2,
      name: "Camiseta Premium",
      price: 29.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 2,
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))

    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado de tu carrito",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-6">Parece que aún no has añadido productos a tu carrito</p>
              <Link href="/products">
                <Button>Explorar Productos</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted px-6 py-3">
                    <h2 className="font-semibold">Productos</h2>
                  </div>
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Precio unitario: ${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted px-6 py-3">
                    <h2 className="font-semibold">Código de Descuento</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2">
                      <Input placeholder="Ingresa tu código" />
                      <Button>Aplicar</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted px-6 py-3">
                    <h2 className="font-semibold">Resumen del Pedido</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button className="w-full mt-4" size="lg">
                      Proceder al Pago
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Impuestos incluidos. El envío se calcula en el checkout.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border p-6 space-y-4">
                  <h3 className="font-semibold">Seguir Comprando</h3>
                  <p className="text-sm text-muted-foreground">
                    ¿Necesitas más productos? Explora nuestras categorías para encontrar lo que buscas.
                  </p>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
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

