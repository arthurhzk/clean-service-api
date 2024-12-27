import { beforeEach, describe, expect, it, vi } from "vitest"
import { PrismaRegistrationRepository } from "./prisma-registration-repository"
import prisma from "@/infra/database/__mocks__/prisma"
import { faker } from "@faker-js/faker"
import { BcryptAdapter } from "@/shared/adapters/bcrypt/bcrypt.adapter"
vi.mock("@/infra/database/prisma")

describe("Prisma Registration Repository", () => {
  let sut: PrismaRegistrationRepository
  beforeEach(() => {
    sut = new PrismaRegistrationRepository()
  })

  it("should create a user", async () => {
    const hash = vi.spyOn(BcryptAdapter.prototype, "hashPassword")
    const password = faker.internet.password()
    const newUser = {
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password,
      name: faker.person.fullName()
    }
    const fakeId = faker.number.hex()
    prisma.user.create.mockResolvedValue({ ...newUser, id: +fakeId })
    const user = await sut.register({ body: newUser })
    expect(user).toStrictEqual({ ...newUser, id: +fakeId })
    expect(hash).toHaveBeenCalledOnce()
  })
})
