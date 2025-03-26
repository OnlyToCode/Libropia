"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

// Opciones para temas literarios
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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: undefined as Date | undefined,
    lugarNacimiento: "",
    direccion: "",
    genero: "",
    email: "",
    temasPreferidos: [] as string[],
    usuario: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      fechaNacimiento: date,
    }))
  }

  const handleGeneroChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      genero: value,
    }))
  }

  const handleTopicChange = (topicId: string, checked: boolean) => {
    setFormData((prev) => {
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

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      acceptTerms: checked,
    }))
  }

  // Modificar la función handleSubmit para que redirija a la página de inicio de sesión
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones",
        variant: "destructive",
      })
      return
    }

    if (!formData.fechaNacimiento) {
      toast({
        title: "Error",
        description: "La fecha de nacimiento es obligatoria",
        variant: "destructive",
      })
      return
    }

    if (formData.temasPreferidos.length === 0) {
      toast({
        title: "Error",
        description: "Selecciona al menos un tema literario de preferencia",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // En una aplicación real, aquí se haría una petición a un API
      // Simulamos un registro exitoso
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.",
      })

      router.push("/login")
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear tu cuenta. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <Card className="mx-auto max-w-3xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
              <CardDescription>Completa el formulario para registrarte en Libropia</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Información Personal</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dni">DNI / Documento de Identidad *</Label>
                      <Input
                        id="dni"
                        name="dni"
                        placeholder="12345678A"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nombres">Nombres *</Label>
                      <Input
                        id="nombres"
                        name="nombres"
                        placeholder="Juan Carlos"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apellidos">Apellidos *</Label>
                      <Input
                        id="apellidos"
                        name="apellidos"
                        placeholder="Pérez García"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.fechaNacimiento && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.fechaNacimiento ? (
                              format(formData.fechaNacimiento, "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.fechaNacimiento}
                            onSelect={handleDateChange}
                            initialFocus
                            disabled={(date) => date > new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lugarNacimiento">Lugar de Nacimiento *</Label>
                      <Input
                        id="lugarNacimiento"
                        name="lugarNacimiento"
                        placeholder="Madrid, España"
                        value={formData.lugarNacimiento}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genero">Género *</Label>
                      <Select onValueChange={handleGeneroChange} required>
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
                    <Label htmlFor="direccion">Dirección de Correspondencia *</Label>
                    <Textarea
                      id="direccion"
                      name="direccion"
                      placeholder="Calle, número, piso, código postal, ciudad, país"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Información de Cuenta</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="usuario@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="usuario">Nombre de Usuario *</Label>
                      <Input
                        id="usuario"
                        name="usuario"
                        placeholder="usuario123"
                        value={formData.usuario}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Mínimo 8 caracteres, incluyendo una mayúscula, un número y un carácter especial
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
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
                          checked={formData.temasPreferidos.includes(topic.id)}
                          onCheckedChange={(checked) => handleTopicChange(topic.id, checked as boolean)}
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

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={handleCheckboxChange} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Acepto los{" "}
                    <Link href="/terminos" className="text-primary underline-offset-4 hover:underline">
                      términos y condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link href="/privacidad" className="text-primary underline-offset-4 hover:underline">
                      política de privacidad
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-sm text-muted-foreground mt-2 text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                  Iniciar Sesión
                </Link>
              </div>
            </CardFooter>
          </Card>
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

