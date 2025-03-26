import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Sesión cerrada correctamente",
    })

    // Eliminar la cookie de autenticación
    response.cookies.delete("auth_token")

    return response
  } catch (error) {
    console.error("Error al cerrar sesión:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Error en el servidor",
      },
      { status: 500 },
    )
  }
}

