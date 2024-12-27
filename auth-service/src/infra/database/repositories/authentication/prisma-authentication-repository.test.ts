import { beforeEach, describe, expect, it, vi } from "vitest"
import { PrismaAuthenticationRepository } from "./prisma-authentication-repository"
import prisma from "@/infra/database/__mocks__/prisma"
import { faker } from "@faker-js/faker"

vi.mock("@/infra/database/prisma")

describe("Prisma Authentication Repository", () => {
  let sut: PrismaAuthenticationRepository

  beforeEach(() => {
    sut = new PrismaAuthenticationRepository()
  })

  it("should authenticate a user", async () => {
    const user = {
      id: +faker.number.hex(),
      email: faker.internet.email(),
      name: faker.person.firstName(),
      password: faker.internet.password()
    }

    prisma.user.findUnique.mockResolvedValue(user)

    const result = await sut.auth({ email: user.email, password: user.password })

    expect(result).toEqual(user)
  })

  it("should return null if user is not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null)

    const result = await sut.auth({ email: faker.internet.email(), password: faker.internet.password() })

    expect(result).toBeNull()
  })
})
