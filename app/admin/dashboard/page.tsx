"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, LogOut, BookOpen, LayoutDashboard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()

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
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard de Administrador</h1>
              <p className="text-muted-foreground">Bienvenido al panel de administración</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Inventario</CardTitle>
                <CardDescription>Gestión de libros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">98 disponibles, 26 agotados</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="/admin/libros">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Gestionar Inventario
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mi Perfil</CardTitle>
                <CardDescription>Gestiona tu información</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">admin1</div>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="/admin/perfil">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Ver Mi Perfil
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">&copy; 2024 Libropia - Panel de Administración</p>
          <p className="text-sm text-muted-foreground">
            Usuario: <strong>admin1</strong> | Rol: <strong>Administrador</strong>
          </p>
        </div>
      </footer>
    </div>
  )
}

