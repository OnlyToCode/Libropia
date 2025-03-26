export interface LoginRequest {
  usuario: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    id: string
    usuario: string
    role: string
  }
}

export interface JWTPayload {
  id: string
  usuario: string
  role: string
  iat: number
  exp: number
}

