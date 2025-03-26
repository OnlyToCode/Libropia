"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, Save, ArrowLeft, LogOut, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

export default function AdminProfilePage() {
  const router = useRouter()
  const { toast } = useToast()

  // Datos simulados del administrador
  const [formData, setFormData] = useState({
    id: "ADM001",
    usuario: "admin1",
    dni: "12345678A",
    nombres: "Juan Carlos",
    apellidos: "Pérez García",
    fechaNacimiento: "1985-05-15",
    lugarNacimiento: "Madrid, España",
    direccion: "Calle Librería 123, 28001 Madrid, España",
    genero: "masculino",
    email: "admin1@libropia.com",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    // En una aplicación real, aquí enviaríamos los datos al servidor
    toast({
      title: "Perfil actualizado",
      description: "Tus datos han sido actualizados correctamente",
    })
  }

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    })
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-semibold">Panel de Administración</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/libros">
                <BookOpen className="h-4 w-4 mr-2" />
                Gestionar Libros
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Mi Perfil de Administrador</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Cuenta</CardTitle>
                  <CardDescription>Datos básicos de tu cuenta de administrador</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="id">ID de Administrador</Label>
                      <Input id="id" value={formData.id} disabled />
                      <p className="text-xs text-muted-foreground">
                        El ID es generado automáticamente y no puede ser modificado
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usuario">Nombre de Usuario</Label>
                      <Input id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} required />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
                    <p className="text-sm text-muted-foreground">
                      Deja estos campos en blanco si no deseas cambiar la contraseña
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor="password">Nueva Contraseña</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Tus datos personales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dni">DNI / Documento de Identidad</Label>
                      <Input id="dni" name="dni" value={formData.dni} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nombres">Nombres</Label>
                      <Input id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellidos">Apellidos</Label>
                      <Input
                        id="apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                      <Input
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        type="date"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lugarNacimiento">Lugar de Nacimiento</Label>
                      <Input
                        id="lugarNacimiento"
                        name="lugarNacimiento"
                        value={formData.lugarNacimiento}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genero">Género</Label>
                      <Select value={formData.genero} onValueChange={(value) => handleSelectChange("genero", value)}>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección de Correspondencia</Label>
                    <Textarea
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">&copy; 2024 Libropia - Panel de Administración</p>
          <p className="text-sm text-muted-foreground">
            Usuario: <strong>{formData.usuario}</strong> | Rol: <strong>Administrador</strong>
          </p>
        </div>
      </footer>
    </div>
  )
}

