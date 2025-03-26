"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Settings, BookOpen, LogOut, Edit, Save, ShoppingBag, Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"

export default function PerfilPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [editMode, setEditMode] = useState(false)

  // En una aplicación real, estos datos vendrían de un estado global o contexto
  // después de la autenticación
  const [userData, setUserData] = useState({
    nombre: "Juan Pérez",
    email: "usuario@ejemplo.com",
    telefono: "+34 612 345 678",
    direccion: "Calle Librería 123, 28001 Madrid, España",
    fechaRegistro: "15 de marzo de 2024",
    temasPreferidos: ["Ficción", "Ciencia Ficción", "Historia"],
  })

  // Historial de pedidos simulado
  const pedidos = [
    {
      id: "ORD-2024-001",
      fecha: "10 de abril de 2024",
      estado: "Entregado",
      total: 45.98,
      items: [
        { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 24.99, tipo: "compra" },
        { id: 2, titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 15.99, tipo: "compra" },
      ],
    },
    {
      id: "ORD-2024-002",
      fecha: "25 de marzo de 2024",
      estado: "Entregado",
      total: 22.99,
      items: [{ id: 3, titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón", precio: 22.99, tipo: "compra" }],
    },
  ]

  // Reservas simuladas
  const reservas = [
    {
      id: "RES-2024-001",
      fecha: "15 de abril de 2024",
      fechaExpiracion: "22 de abril de 2024",
      estado: "Activa",
      libro: { id: 4, titulo: "1984", autor: "George Orwell" },
    },
    {
      id: "RES-2024-002",
      fecha: "2 de abril de 2024",
      fechaExpiracion: "9 de abril de 2024",
      estado: "Expirada",
      libro: { id: 5, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes" },
    },
  ]

  const handleLogout = () => {
    // En una aplicación real, aquí se cerraría la sesión
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    })
    router.push("/login")
  }

  const handleSaveProfile = () => {
    setEditMode(false)
    toast({
      title: "Perfil actualizado",
      description: "Los cambios en tu perfil han sido guardados",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.nombre} />
                    <AvatarFallback>
                      {userData.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{userData.nombre}</h2>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">Miembro desde {userData.fechaRegistro}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <Link href="#perfil" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <User className="h-4 w-4" />
                      <span>Mi Perfil</span>
                    </Link>
                    <Link href="#pedidos" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Mis Pedidos</span>
                    </Link>
                    <Link href="#reservas" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <BookOpen className="h-4 w-4" />
                      <span>Mis Reservas</span>
                    </Link>
                    <Link href="#configuracion" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <Tabs defaultValue="perfil">
                <TabsList className="w-full border-b rounded-none justify-start">
                  <TabsTrigger value="perfil">Mi Perfil</TabsTrigger>
                  <TabsTrigger value="pedidos">Mis Pedidos</TabsTrigger>
                  <TabsTrigger value="reservas">Mis Reservas</TabsTrigger>
                  <TabsTrigger value="configuracion">Configuración</TabsTrigger>
                </TabsList>

                {/* Perfil Tab */}
                <TabsContent value="perfil" className="space-y-6 pt-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Información Personal</CardTitle>
                        <CardDescription>Gestiona tu información personal</CardDescription>
                      </div>
                      {editMode ? (
                        <Button onClick={handleSaveProfile} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Guardar
                        </Button>
                      ) : (
                        <Button onClick={() => setEditMode(true)} variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre completo</Label>
                          <Input
                            id="nombre"
                            value={userData.nombre}
                            onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo electrónico</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            disabled={!editMode}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            id="telefono"
                            value={userData.telefono}
                            onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                          id="direccion"
                          value={userData.direccion}
                          onChange={(e) => setUserData({ ...userData, direccion: e.target.value })}
                          disabled={!editMode}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Preferencias Literarias</CardTitle>
                      <CardDescription>Tus géneros literarios favoritos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {userData.temasPreferidos.map((tema, index) => (
                          <Badge key={index} variant="secondary">
                            {tema}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Pedidos Tab */}
                <TabsContent value="pedidos" className="space-y-6 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historial de Pedidos</CardTitle>
                      <CardDescription>Consulta tus pedidos anteriores</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {pedidos.length > 0 ? (
                        <div className="space-y-6">
                          {pedidos.map((pedido) => (
                            <div key={pedido.id} className="border rounded-lg overflow-hidden">
                              <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div>
                                  <h3 className="font-medium">{pedido.id}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{pedido.fecha}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={pedido.estado === "Entregado" ? "default" : "outline"}>
                                    {pedido.estado}
                                  </Badge>
                                  <span className="font-medium">${pedido.total.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="p-4 divide-y">
                                {pedido.items.map((item) => (
                                  <div key={item.id} className="py-3 flex justify-between items-center">
                                    <div>
                                      <h4 className="font-medium">{item.titulo}</h4>
                                      <p className="text-sm text-muted-foreground">{item.autor}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">${item.precio.toFixed(2)}</p>
                                      <Badge variant="outline" className="text-xs">
                                        {item.tipo === "compra" ? "Compra" : "Reserva"}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No tienes pedidos</h3>
                          <p className="text-muted-foreground">Cuando realices un pedido, aparecerá aquí</p>
                          <Button className="mt-4" asChild>
                            <Link href="/libros">Explorar Catálogo</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reservas Tab */}
                <TabsContent value="reservas" className="space-y-6 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mis Reservas</CardTitle>
                      <CardDescription>Gestiona tus reservas de libros</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {reservas.length > 0 ? (
                        <div className="space-y-4">
                          {reservas.map((reserva) => (
                            <div key={reserva.id} className="border rounded-lg p-4">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                                <div>
                                  <h3 className="font-medium">{reserva.libro.titulo}</h3>
                                  <p className="text-sm text-muted-foreground">{reserva.libro.autor}</p>
                                </div>
                                <Badge variant={reserva.estado === "Activa" ? "default" : "secondary"}>
                                  {reserva.estado}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>Reservado: {reserva.fecha}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>Expira: {reserva.fechaExpiracion}</span>
                                </div>
                              </div>
                              {reserva.estado === "Activa" && (
                                <div className="mt-3">
                                  <Button size="sm" variant="outline" asChild>
                                    <Link href={`/libros/${reserva.libro.id}`}>Ver Detalles</Link>
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No tienes reservas</h3>
                          <p className="text-muted-foreground">Cuando reserves un libro, aparecerá aquí</p>
                          <Button className="mt-4" asChild>
                            <Link href="/libros">Explorar Catálogo</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Configuración Tab */}
                <TabsContent value="configuracion" className="space-y-6 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuración de la Cuenta</CardTitle>
                      <CardDescription>Gestiona la configuración de tu cuenta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Cambiar Contraseña</h3>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Contraseña actual</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nueva contraseña</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="mt-2">Actualizar Contraseña</Button>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <h3 className="font-medium">Notificaciones</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-notif">Notificaciones por email</Label>
                            <input type="checkbox" id="email-notif" className="toggle" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="promo-notif">Ofertas y promociones</Label>
                            <input type="checkbox" id="promo-notif" className="toggle" defaultChecked />
                          </div>
                        </div>
                        <Button variant="outline" className="mt-2">
                          Guardar Preferencias
                        </Button>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <h3 className="font-medium text-destructive">Zona de Peligro</h3>
                        <p className="text-sm text-muted-foreground">
                          Una vez eliminada tu cuenta, todos tus datos serán borrados permanentemente.
                        </p>
                        <Button variant="destructive">Eliminar Cuenta</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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

