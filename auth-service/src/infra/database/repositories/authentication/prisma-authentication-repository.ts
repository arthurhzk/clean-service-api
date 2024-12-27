import { User } from "@prisma/client"
import { Authentication } from "@/domain/authentication/authentication-request"
import prisma from "@/infra/database/prisma"
export class PrismaAuthenticationRepository {
  async auth(data: Authentication.Request): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: data.email,
        password: data.password
      }
    })
  }
}
