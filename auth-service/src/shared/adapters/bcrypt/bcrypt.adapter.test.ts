import { describe, it, expect, beforeEach, vi } from "vitest"
import { BcryptAdapter } from "@/shared/adapters/bcrypt/bcrypt.adapter"
import { faker } from "@faker-js/faker"

describe("Bcrypt Adapter", () => {
  let sut: BcryptAdapter
  beforeEach(() => {
    sut = new BcryptAdapter()
    vi.resetAllMocks()
  })
  it("should return a hash password", async () => {
    vi.spyOn(sut, "hashPassword")
    const password = faker.internet.password()
    const salt = 12
    const hash = await sut.hashPassword(password, salt)
    expect(hash).toBeDefined()
    expect(sut.hashPassword).toHaveBeenCalledOnce()
  })
  it("should return true if password is valid", async () => {
    vi.spyOn(sut, "compare").mockResolvedValueOnce(true)
    const password = faker.internet.password()
    const salt = 12
    const hash = await sut.hashPassword(password, salt)
    const isValid = await sut.compare(password, hash)
    expect(isValid).toBeTruthy()
    expect(sut.compare).toHaveBeenCalledOnce()
  })
  it("should return false if password is invalid", async () => {
    const password = faker.internet.password()
    const salt = 12
    vi.spyOn(sut, "compare").mockResolvedValueOnce(false)
    const hash = await sut.hashPassword(password, salt)
    const isValid = await sut.compare(faker.internet.password(), hash)
    expect(isValid).toBeFalsy()
    expect(sut.compare).toHaveBeenCalledOnce()
  })
})
