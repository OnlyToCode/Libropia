import jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"
import type { JWTPayload } from "@/types/auth"
import prisma from "./prisma"

export async function verifyCredentials(usuario: string, password: string) {
  // Buscar el usuario en la base de datos
  const user = await prisma.user.findUnique({
    where: {
      usuario,
    },
  })

  if (!user) {
    return null
  }

  // Verificar la contraseña
  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return null
  }

  return {
    id: user.id,
    usuario: user.usuario,
    role: user.role,
  }
}

export function generateToken(payload: Omit<JWTPayload, "iat" | "exp">) {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno")
  }

  return jwt.sign(
    payload,
    jwtSecret,
    { expiresIn: "24h" }, // El token expira en 24 horas
  )
}

export function verifyToken(token: string): JWTPayload | null {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno")
  }

  try {
    return jwt.verify(token, jwtSecret) as JWTPayload
  } catch (error) {
    return null
  }
}

export function getUserFromToken(token: string) {
  const payload = verifyToken(token)

  if (!payload) {
    return null
  }

  return {
    id: payload.id,
    usuario: payload.usuario,
    role: payload.role,
  }
}

