"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"
import type { LoginResponse } from "@/types/auth"

export default function LoginPage() {
  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Llamar a la API de inicio de sesión
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      })

      const data: LoginResponse = await response.json()
      console.log("Datos recibidos en el frontend:", data) // 👀 Agrega esto

      




      if (data.success && data.user) {
        console.log("Rol del usuario:", data.user.role) // 👀 Agrega esto
        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido, ${data.user.usuario}`,
        })
        
        console.log("Datos recibidos en el frontend2:", data) // 👀 Agrega esto
        // Redirigir según el rol del usuario
        console.log("Router:", router)
        
 
        
        
        if (data.user.role === "root") {
          
          router.push("/admin")
          console.log("salio del P:")
          window.location.href = "/admin"

        } else if (data.user.role === "admin") {
          router.push("/admin/dashboard")
        } else if (data.user.role === "cliente") {
          router.push("/cliente/perfil")
        } else {
          router.push("/perfil")
        }
      } else {
        // Mantener la lógica simulada para usuarios que no son root
        // Esto es temporal hasta que se implemente la autenticación completa
        if (usuario === "admin1" && password === "admin123") {
          toast({
            title: "Inicio de sesión exitoso",
            description: "Bienvenido, administrador",
          })
          router.push("/admin/dashboard")
        } else if (usuario === "usuario@ejemplo.com" && password === "password") {
          toast({
            title: "Inicio de sesión exitoso",
            description: "Bienvenido de nuevo a Libropia",
          })
          router.push("/perfil")
        } else if (usuario === "cliente@ejemplo.com" && password === "cliente123") {
          toast({
            title: "Inicio de sesión exitoso",
            description: "Bienvenido, cliente",
          })
          router.push("/cliente/perfil")
        } else {
          toast({
            title: "Error de inicio de sesión",
            description: data.message || "Credenciales incorrectas. Inténtalo de nuevo.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="usuario">Usuario o Correo Electrónico</Label>
                <Input
                  id="usuario"
                  placeholder="usuario o correo@ejemplo.com"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground mt-2">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="text-primary underline-offset-4 hover:underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

