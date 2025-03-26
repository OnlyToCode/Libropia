import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"

// Rutas que requieren autenticación de root
const ROOT_PROTECTED_ROUTES = ["/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la ruta requiere autenticación de root
  const isRootProtectedRoute = ROOT_PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )

  if (isRootProtectedRoute) {
    // Obtener el token de la cookie o del header de autorización
    const token =
      request.cookies.get("auth_token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      // Redirigir al login si no hay token
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Verificar el token
    const payload = verifyToken(token)

    if (!payload || payload.role !== "root") {
      // Redirigir al login si el token no es válido o no es el usuario root
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

