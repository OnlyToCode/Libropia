import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Verificar si el usuario root ya existe
  const existingRoot = await prisma.user.findUnique({
    where: {
      usuario: "root",
    },
  })

  if (!existingRoot) {
    // Crear el usuario root
    const hashedPassword = await bcrypt.hash("admin123", 10)

    await prisma.user.create({
      data: {
        usuario: "root",
        password: hashedPassword,
        role: "root",
      },
    })

    console.log("Usuario root creado correctamente")
  } else {
    console.log("El usuario root ya existe")
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

