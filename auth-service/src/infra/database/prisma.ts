import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const prismaConnection = async () => {
  await prisma.$connect().then(() => console.log("Connected to database"))
}

export default prismaConnection
