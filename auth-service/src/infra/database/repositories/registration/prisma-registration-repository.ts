import { Registration } from "@/domain/registration/registration-request"
import { User } from "@prisma/client"
import prisma from "@/infra/database/prisma"
import { BcryptAdapter } from "@/shared/adapters/bcrypt/bcrypt.adapter"

export class PrismaRegistrationRepository {
  async register(data: Registration.Request): Promise<User> {
    const salt = 12
    const hash = await new BcryptAdapter().hashPassword(data.body.password, salt)
    return await prisma.user.create({
      data: {
        email: data.body.email,
        password: hash
      }
    })
  }
}
