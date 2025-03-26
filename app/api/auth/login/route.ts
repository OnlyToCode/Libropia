import { type NextRequest, NextResponse } from "next/server"
import { verifyCredentials, generateToken } from "@/lib/auth"
import type { LoginRequest, LoginResponse } from "@/types/auth"

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { usuario, password } = body

    // Verificar credenciales
    const user = await verifyCredentials(usuario, password)
    console.log("Usuario autenticado en el backend:", user)

    if (user) {
      // Generar token JWT
      const token = generateToken({
        id: user.id,
        usuario: user.usuario,
        role: user.role,
      })

      const response: LoginResponse = {
        success: true,
        message: "Inicio de sesión exitoso",
        token,
        user,
      }

      // Crear respuesta con cookie
      const nextResponse = NextResponse.json(response)

      // Establecer cookie segura con el token
      
      nextResponse.cookies.set({
        name: "auth_token",
        value: token,
        httpOnly: true,
        secure: false, // Cambia a false si estás en desarrollo
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 día
        path: "/",
      })
    
      return nextResponse
    }




    
/////////////////
    // Si las credenciales son incorrectas, devolver error
    return NextResponse.json(
      {
        success: false,
        message: "Credenciales incorrectas",
      } as LoginResponse,
      { status: 401 },
    )
  } catch (error) {
    console.error("Error en el inicio de sesión:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Error en el servidor",
      } as LoginResponse,
      { status: 500 },
    )
  }
}

