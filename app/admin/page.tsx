"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Users, UserPlus, Edit, Trash2, LogOut, ChevronLeft, ChevronRight, Search, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Tipo para los usuarios administradores
type Admin = {
  id: string
  usuario: string
  dni?: string
  nombres?: string
  apellidos?: string
  fechaNacimiento?: string
  lugarNacimiento?: string
  direccion?: string
  genero?: string
  email?: string
  fechaCreacion: string
  ultimoAcceso?: string
  estado: "activo" | "inactivo"
}

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isRootUser, setIsRootUser] = useState(true) // Simulamos que es el usuario root

  // Datos simulados de administradores
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "ROOT",
      usuario: "root",
      email: "root@libropia.com",
      fechaCreacion: "01/01/2024",
      ultimoAcceso: "15/04/2024",
      estado: "activo",
    },
    {
      id: "ADM001",
      usuario: "admin1",
      dni: "12345678A",
      nombres: "Juan Carlos",
      apellidos: "Pérez García",
      email: "admin1@libropia.com",
      fechaCreacion: "15/03/2024",
      ultimoAcceso: "12/04/2024",
      estado: "activo",
    },
    {
      id: "ADM002",
      usuario: "admin2",
      dni: "87654321B",
      nombres: "María",
      apellidos: "López Sánchez",
      email: "admin2@libropia.com",
      fechaCreacion: "20/03/2024",
      ultimoAcceso: "10/04/2024",
      estado: "activo",
    },
    {
      id: "ADM003",
      usuario: "admin3",
      fechaCreacion: "05/04/2024",
      estado: "inactivo",
    },
  ])

  // Filtrar administradores por búsqueda
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (admin.nombres && admin.nombres.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (admin.apellidos && admin.apellidos.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (admin.email && admin.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    })
    router.push("/login")
  }

  const handleDeleteAdmin = (id: string) => {
    // Verificar si el administrador a eliminar es el usuario root
    const adminToDelete = admins.find((admin) => admin.id === id)
    if (adminToDelete && adminToDelete.usuario === "root") {
      toast({
        title: "Operación no permitida",
        description: "No se puede eliminar el usuario root del sistema",
        variant: "destructive",
      })
      return
    }

    setAdmins(admins.filter((admin) => admin.id !== id))
    toast({
      title: "Administrador eliminado",
      description: "El administrador ha sido eliminado correctamente",
    })
  }

  const handleCreateAdmin = (newAdmin: Partial<Admin>) => {
    const adminId = `ADM${String(admins.length).padStart(3, "0")}`

    setAdmins([
      ...admins,
      {
        id: adminId,
        usuario: newAdmin.usuario || "",
        dni: newAdmin.dni,
        nombres: newAdmin.nombres,
        apellidos: newAdmin.apellidos,
        fechaNacimiento: newAdmin.fechaNacimiento,
        lugarNacimiento: newAdmin.lugarNacimiento,
        direccion: newAdmin.direccion,
        genero: newAdmin.genero,
        email: newAdmin.email,
        fechaCreacion: new Date().toLocaleDateString(),
        estado: "activo",
      },
    ])

    toast({
      title: "Administrador creado",
      description: "El nuevo administrador ha sido creado correctamente",
    })
  }

  // Verificar si es el usuario root
  useEffect(() => {
    // En una aplicación real, aquí verificaríamos si el usuario actual es root
    // Por ahora, simulamos que es el usuario root
    setIsRootUser(true)
  }, [])

  // Si no es el usuario root, redirigir
  if (!isRootUser) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Acceso Denegado</CardTitle>
            <CardDescription>No tienes permisos para acceder a esta página</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/")} className="w-full">
              Volver al Inicio
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
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
              <h1 className="text-3xl font-bold tracking-tight">Gestión de Administradores</h1>
              <p className="text-muted-foreground">Crea y gestiona usuarios administradores del sistema</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar administrador..."
                  className="w-full pl-8 md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Nuevo Administrador
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Administrador</DialogTitle>
                    <DialogDescription>
                      Ingresa los datos básicos para crear un nuevo usuario administrador. El administrador podrá
                      completar el resto de su información más tarde.
                    </DialogDescription>
                  </DialogHeader>
                  <AdminForm onSubmit={handleCreateAdmin} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Administradores</CardTitle>
                <CardDescription>Gestión de usuarios administradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{admins.length}</div>
                <p className="text-xs text-muted-foreground">
                  {admins.filter((a) => a.estado === "activo").length} activos,{" "}
                  {admins.filter((a) => a.estado === "inactivo").length} inactivos
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="#admin-table">
                    <Users className="h-4 w-4 mr-2" />
                    Ver Administradores
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-6" id="admin-table">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead className="hidden md:table-cell">Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Fecha Creación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.id}</TableCell>
                        <TableCell>{admin.usuario}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {admin.nombres && admin.apellidos ? (
                            `${admin.nombres} ${admin.apellidos}`
                          ) : (
                            <span className="text-muted-foreground italic">Sin completar</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {admin.email || <span className="text-muted-foreground italic">Sin completar</span>}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{admin.fechaCreacion}</TableCell>
                        <TableCell>
                          <Badge variant={admin.estado === "activo" ? "default" : "secondary"}>
                            {admin.estado === "activo" ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Editar</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Editar Administrador</DialogTitle>
                                  <DialogDescription>
                                    Modifica los datos del administrador {admin.usuario}.
                                  </DialogDescription>
                                </DialogHeader>
                                <AdminForm
                                  admin={admin}
                                  onSubmit={(data) => {
                                    // Actualizar el administrador en el estado
                                    setAdmins(admins.map((a) => (a.id === admin.id ? { ...a, ...data } : a)))
                                    toast({
                                      title: "Administrador actualizado",
                                      description: "Los datos del administrador han sido actualizados correctamente",
                                    })
                                  }}
                                />
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={admin.usuario === "root"}
                                  title={
                                    admin.usuario === "root"
                                      ? "No se puede eliminar el usuario root"
                                      : "Eliminar administrador"
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Eliminar</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará al administrador {admin.usuario} y no se puede deshacer.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteAdmin(admin.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No se encontraron administradores
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Mostrando <strong>{filteredAdmins.length}</strong> de <strong>{admins.length}</strong> administradores
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Página anterior</span>
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Página siguiente</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">&copy; 2024 Libropia - Panel de Administración</p>
          <p className="text-sm text-muted-foreground">
            Usuario: <strong>root</strong> | Rol: <strong>Superadministrador</strong>
          </p>
        </div>
      </footer>
    </div>
  )
}

// Componente para el formulario de creación/edición de administradores
function AdminForm({
  admin,
  onSubmit,
}: {
  admin?: Partial<Admin>
  onSubmit: (data: Partial<Admin>) => void
}) {
  const [formData, setFormData] = useState({
    usuario: admin?.usuario || "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    onSubmit({
      usuario: formData.usuario,
      // En una aplicación real, nunca enviaríamos la contraseña en texto plano
      // Aquí solo es para demostración
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <label htmlFor="usuario" className="text-sm font-medium">
            Usuario
          </label>
          <Input id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={!admin}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirmar Contraseña
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={!admin}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{admin ? "Actualizar" : "Crear"}</Button>
      </DialogFooter>
    </form>
  )
}

