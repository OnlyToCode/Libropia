import { type NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Obtener el token de la cookie o del header de autorización
    const token =
      request.cookies.get("auth_token")?.value || request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
          message: "No se proporcionó token de autenticación",
        },
        { status: 401 },
      )
    }

    // Verificar el token y obtener el usuario
    const user = getUserFromToken(token)

    if (!user) {
      return NextResponse.json(
        {
          authenticated: false,
          message: "Token inválido o expirado",
        },
        { status: 401 },
      )
    }

    return NextResponse.json({
      authenticated: true,
      user,
    })
  } catch (error) {
    console.error("Error al verificar la autenticación:", error)

    return NextResponse.json(
      {
        authenticated: false,
        message: "Error en el servidor",
      },
      { status: 500 },
    )
  }
}

