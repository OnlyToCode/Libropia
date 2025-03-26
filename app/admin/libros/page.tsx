"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, LogOut, Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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

// Tipo para los libros
type Libro = {
  id: string
  titulo: string
  autor: string
  editorial: string
  anio: number
  isbn: string
  genero: string
  precio: number
  stock: number
  imagen?: string
  estado: "disponible" | "agotado" | "proximamente"
}

export default function AdminLibrosPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  // Datos simulados de libros
  const [libros, setLibros] = useState<Libro[]>([
    {
      id: "LIB001",
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      editorial: "Editorial Sudamericana",
      anio: 1967,
      isbn: "9780307474728",
      genero: "Realismo mágico",
      precio: 24.99,
      stock: 15,
      imagen: "/placeholder.svg?height=100&width=100",
      estado: "disponible",
    },
    {
      id: "LIB002",
      titulo: "1984",
      autor: "George Orwell",
      editorial: "Debolsillo",
      anio: 1949,
      isbn: "9780451524935",
      genero: "Distopía",
      precio: 19.99,
      stock: 8,
      imagen: "/placeholder.svg?height=100&width=100",
      estado: "disponible",
    },
    {
      id: "LIB003",
      titulo: "El principito",
      autor: "Antoine de Saint-Exupéry",
      editorial: "Salamandra",
      anio: 1943,
      isbn: "9788498381498",
      genero: "Literatura infantil",
      precio: 15.99,
      stock: 0,
      imagen: "/placeholder.svg?height=100&width=100",
      estado: "agotado",
    },
    {
      id: "LIB004",
      titulo: "La sombra del viento",
      autor: "Carlos Ruiz Zafón",
      editorial: "Planeta",
      anio: 2001,
      isbn: "9788408043645",
      genero: "Misterio",
      precio: 22.99,
      stock: 5,
      imagen: "/placeholder.svg?height=100&width=100",
      estado: "disponible",
    },
  ])

  // Filtrar libros por búsqueda
  const filteredLibros = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.isbn.includes(searchQuery) ||
      libro.genero.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    })
    router.push("/login")
  }

  const handleDeleteLibro = (id: string) => {
    setLibros(libros.filter((libro) => libro.id !== id))
    toast({
      title: "Libro eliminado",
      description: "El libro ha sido eliminado correctamente del inventario",
    })
  }

  const handleCreateLibro = (nuevoLibro: Partial<Libro>) => {
    const libroId = `LIB${String(libros.length + 1).padStart(3, "0")}`

    setLibros([
      ...libros,
      {
        id: libroId,
        titulo: nuevoLibro.titulo || "",
        autor: nuevoLibro.autor || "",
        editorial: nuevoLibro.editorial || "",
        anio: nuevoLibro.anio || new Date().getFullYear(),
        isbn: nuevoLibro.isbn || "",
        genero: nuevoLibro.genero || "",
        precio: nuevoLibro.precio || 0,
        stock: nuevoLibro.stock || 0,
        imagen: nuevoLibro.imagen || "/placeholder.svg?height=100&width=100",
        estado: nuevoLibro.stock && nuevoLibro.stock > 0 ? "disponible" : "agotado",
      },
    ])

    toast({
      title: "Libro agregado",
      description: "El nuevo libro ha sido agregado correctamente al inventario",
    })
  }

  const handleUpdateLibro = (id: string, libroActualizado: Partial<Libro>) => {
    setLibros(
      libros.map((libro) => {
        if (libro.id === id) {
          // Actualizar el estado basado en el stock
          const estado = libroActualizado.stock && libroActualizado.stock > 0 ? "disponible" : "agotado"

          return {
            ...libro,
            ...libroActualizado,
            estado,
          }
        }
        return libro
      }),
    )

    toast({
      title: "Libro actualizado",
      description: "El libro ha sido actualizado correctamente",
    })
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
              <Link href="/admin/perfil">Mi Perfil</Link>
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
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Inventario</h1>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <p className="text-muted-foreground">Administra el inventario de libros de la biblioteca</p>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar libro..."
                  className="w-full pl-8 md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Libro
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Libro</DialogTitle>
                    <DialogDescription>
                      Ingresa los datos del nuevo libro para agregarlo al inventario
                    </DialogDescription>
                  </DialogHeader>
                  <LibroForm onSubmit={handleCreateLibro} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead className="hidden md:table-cell">Autor</TableHead>
                    <TableHead className="hidden md:table-cell">Género</TableHead>
                    <TableHead className="hidden lg:table-cell">ISBN</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLibros.length > 0 ? (
                    filteredLibros.map((libro) => (
                      <TableRow key={libro.id}>
                        <TableCell className="font-medium">{libro.id}</TableCell>
                        <TableCell>{libro.titulo}</TableCell>
                        <TableCell className="hidden md:table-cell">{libro.autor}</TableCell>
                        <TableCell className="hidden md:table-cell">{libro.genero}</TableCell>
                        <TableCell className="hidden lg:table-cell">{libro.isbn}</TableCell>
                        <TableCell>${libro.precio.toFixed(2)}</TableCell>
                        <TableCell>{libro.stock}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              libro.estado === "disponible"
                                ? "default"
                                : libro.estado === "agotado"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {libro.estado === "disponible"
                              ? "Disponible"
                              : libro.estado === "agotado"
                                ? "Agotado"
                                : "Próximamente"}
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
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Editar Libro</DialogTitle>
                                  <DialogDescription>Modifica los datos del libro "{libro.titulo}"</DialogDescription>
                                </DialogHeader>
                                <LibroForm libro={libro} onSubmit={(data) => handleUpdateLibro(libro.id, data)} />
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Eliminar</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará el libro "{libro.titulo}" del inventario y no se puede
                                    deshacer.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteLibro(libro.id)}
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
                      <TableCell colSpan={9} className="h-24 text-center">
                        No se encontraron libros
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Mostrando <strong>{filteredLibros.length}</strong> de <strong>{libros.length}</strong> libros
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
            Usuario: <strong>admin1</strong> | Rol: <strong>Administrador</strong>
          </p>
        </div>
      </footer>
    </div>
  )
}

// Componente para el formulario de creación/edición de libros
function LibroForm({
  libro,
  onSubmit,
}: {
  libro?: Libro
  onSubmit: (data: Partial<Libro>) => void
}) {
  const [formData, setFormData] = useState({
    titulo: libro?.titulo || "",
    autor: libro?.autor || "",
    editorial: libro?.editorial || "",
    anio: libro?.anio || new Date().getFullYear(),
    isbn: libro?.isbn || "",
    genero: libro?.genero || "",
    precio: libro?.precio || 0,
    stock: libro?.stock || 0,
    imagen: libro?.imagen || "/placeholder.svg?height=100&width=100",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "anio" || name === "precio" || name === "stock" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="titulo" className="text-sm font-medium">
              Título
            </label>
            <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <label htmlFor="autor" className="text-sm font-medium">
              Autor
            </label>
            <Input id="autor" name="autor" value={formData.autor} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="editorial" className="text-sm font-medium">
              Editorial
            </label>
            <Input id="editorial" name="editorial" value={formData.editorial} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <label htmlFor="anio" className="text-sm font-medium">
              Año de Publicación
            </label>
            <Input
              id="anio"
              name="anio"
              type="number"
              min="1000"
              max={new Date().getFullYear()}
              value={formData.anio}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="isbn" className="text-sm font-medium">
              ISBN
            </label>
            <Input id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <label htmlFor="genero" className="text-sm font-medium">
              Género
            </label>
            <Input id="genero" name="genero" value={formData.genero} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="precio" className="text-sm font-medium">
              Precio
            </label>
            <Input
              id="precio"
              name="precio"
              type="number"
              min="0"
              step="0.01"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="stock" className="text-sm font-medium">
              Stock
            </label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="imagen" className="text-sm font-medium">
            URL de la Imagen
          </label>
          <Input id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} />
          <p className="text-xs text-muted-foreground">Deja en blanco para usar una imagen predeterminada</p>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{libro ? "Actualizar Libro" : "Agregar Libro"}</Button>
      </DialogFooter>
    </form>
  )
}

