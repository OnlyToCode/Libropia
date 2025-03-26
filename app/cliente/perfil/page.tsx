"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Settings, BookOpen, LogOut, Edit, Save, ShoppingBag, Calendar } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function ClientePerfilPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [editMode, setEditMode] = useState(false)

  // En una aplicación real, estos datos vendrían de un estado global o contexto
  // después de la autenticación
  const [userData, setUserData] = useState({
    dni: "12345678X",
    nombres: "María",
    apellidos: "González López",
    fechaNacimiento: "1990-05-15",
    lugarNacimiento: "Barcelona, España",
    direccion: "Calle Principal 123, 08001 Barcelona, España",
    genero: "femenino",
    email: "cliente@ejemplo.com",
    temasPreferidos: ["Ficción", "Misterio", "Romance"],
    usuario: "mariagonzalez",
    telefono: "+34 612 345 678",
    fechaRegistro: "10 de marzo de 2024",
    acceptTerms: true,
  })

  // Historial de pedidos simulado
  const pedidos = [
    {
      id: "ORD-2024-003",
      fecha: "5 de abril de 2024",
      estado: "Entregado",
      total: 38.98,
      items: [
        { id: 1, titulo: "El código Da Vinci", autor: "Dan Brown", precio: 17.99, tipo: "compra" },
        { id: 2, titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", precio: 18.99, tipo: "compra" },
      ],
    },
    {
      id: "ORD-2024-004",
      fecha: "20 de marzo de 2024",
      estado: "Entregado",
      total: 24.99,
      items: [
        { id: 3, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 24.99, tipo: "compra" },
      ],
    },
  ]

  // Temas literarios para el formulario de edición
  const literaryTopics = [
    { id: "ficcion", label: "Ficción" },
    { id: "no-ficcion", label: "No Ficción" },
    { id: "fantasia", label: "Fantasía" },
    { id: "ciencia-ficcion", label: "Ciencia Ficción" },
    { id: "misterio", label: "Misterio" },
    { id: "romance", label: "Romance" },
    { id: "historia", label: "Historia" },
    { id: "biografia", label: "Biografía" },
    { id: "poesia", label: "Poesía" },
    { id: "clasicos", label: "Clásicos" },
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

  const handleTopicChange = (topicId: string, checked: boolean) => {
    setUserData((prev) => {
      if (checked) {
        return {
          ...prev,
          temasPreferidos: [...prev.temasPreferidos, topicId],
        }
      } else {
        return {
          ...prev,
          temasPreferidos: prev.temasPreferidos.filter((id) => id !== topicId),
        }
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGeneroChange = (value: string) => {
    setUserData((prev) => ({
      ...prev,
      genero: value,
    }))
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
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.nombres} />
                    <AvatarFallback>
                      {userData.nombres
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">
                    {userData.nombres} {userData.apellidos}
                  </h2>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">Cliente desde {userData.fechaRegistro}</p>
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
                    <Link href="#libros" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <BookOpen className="h-4 w-4" />
                      <span>Mis Libros</span>
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
                  <TabsTrigger value="libros">Mis Libros</TabsTrigger>
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
                      {!editMode ? (
                        // Vista de perfil
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>DNI / Documento de Identidad</Label>
                            <p className="text-sm">{userData.dni}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Nombres</Label>
                            <p className="text-sm">{userData.nombres}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Apellidos</Label>
                            <p className="text-sm">{userData.apellidos}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Fecha de Nacimiento</Label>
                            <p className="text-sm">{userData.fechaNacimiento}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Lugar de Nacimiento</Label>
                            <p className="text-sm">{userData.lugarNacimiento}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Género</Label>
                            <p className="text-sm capitalize">{userData.genero}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Correo Electrónico</Label>
                            <p className="text-sm">{userData.email}</p>
                          </div>
                          <div className="space-y-2">
                            <Label>Teléfono</Label>
                            <p className="text-sm">{userData.telefono}</p>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label>Dirección</Label>
                            <p className="text-sm">{userData.direccion}</p>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label>Temas Preferidos</Label>
                            <div className="flex flex-wrap gap-2">
                              {userData.temasPreferidos.map((tema, index) => (
                                <Badge key={index} variant="secondary">
                                  {tema}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Formulario de edición
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="dni">DNI / Documento de Identidad *</Label>
                              <Input id="dni" name="dni" value={userData.dni} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="nombres">Nombres *</Label>
                              <Input
                                id="nombres"
                                name="nombres"
                                value={userData.nombres}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="apellidos">Apellidos *</Label>
                              <Input
                                id="apellidos"
                                name="apellidos"
                                value={userData.apellidos}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                              <Input
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                type="date"
                                value={userData.fechaNacimiento}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lugarNacimiento">Lugar de Nacimiento *</Label>
                              <Input
                                id="lugarNacimiento"
                                name="lugarNacimiento"
                                value={userData.lugarNacimiento}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="genero">Género *</Label>
                              <Select value={userData.genero} onValueChange={handleGeneroChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona tu género" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="masculino">Masculino</SelectItem>
                                  <SelectItem value="femenino">Femenino</SelectItem>
                                  <SelectItem value="no-binario">No binario</SelectItem>
                                  <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Correo Electrónico *</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="telefono">Teléfono</Label>
                              <Input id="telefono" name="telefono" value={userData.telefono} onChange={handleChange} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="direccion">Dirección de Correspondencia *</Label>
                            <Textarea
                              id="direccion"
                              name="direccion"
                              value={userData.direccion}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Preferencias Literarias</h3>
                            <p className="text-sm text-muted-foreground">
                              Selecciona los temas literarios que más te interesan (mínimo uno)
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {literaryTopics.map((topic) => (
                                <div key={topic.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={topic.id}
                                    checked={userData.temasPreferidos.includes(topic.label)}
                                    onCheckedChange={(checked) => handleTopicChange(topic.label, checked as boolean)}
                                  />
                                  <label
                                    htmlFor={topic.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {topic.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
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

                {/* Libros Tab */}
                <TabsContent value="libros" className="space-y-6 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mis Libros</CardTitle>
                      <CardDescription>Libros que has comprado o reservado</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-6">
                        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Tu biblioteca está vacía</h3>
                        <p className="text-muted-foreground">Cuando compres o reserves libros, aparecerán aquí</p>
                        <Button className="mt-4" asChild>
                          <Link href="/libros">Explorar Catálogo</Link>
                        </Button>
                      </div>
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

