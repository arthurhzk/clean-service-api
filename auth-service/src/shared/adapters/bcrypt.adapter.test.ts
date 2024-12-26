import { describe, it, expect, beforeEach, vi } from "vitest"
import { BcryptAdapter } from "@/shared/adapters/bcrypt.adapter"
import { faker } from "@faker-js/faker"

describe("Bcrypt Adapter", () => {
  let sut: BcryptAdapter
  beforeEach(() => {
    sut = new BcryptAdapter()
  })
  it("should return a hash password", async () => {
    vi.spyOn(BcryptAdapter.prototype, "hashPassword")
    const password = faker.internet.password()
    const salt = 12
    const hash = await sut.hashPassword(password, salt)
    expect(hash).toBeDefined()
    expect(BcryptAdapter.prototype.hashPassword).toHaveBeenCalledOnce()
  })
  it("should return true if password is valid", async () => {
    vi.spyOn(BcryptAdapter.prototype, "compare").mockResolvedValueOnce(true)
    const password = faker.internet.password()
    const salt = 12
    const hash = await sut.hashPassword(password, salt)
    const isValid = await sut.compare(password, hash)
    expect(isValid).toBeTruthy()
    expect(BcryptAdapter.prototype.compare).toHaveBeenCalledOnce()
  })
  it("should return false if password is invalid", async () => {
    const password = faker.internet.password()
    const salt = 12
    vi.spyOn(BcryptAdapter.prototype, "compare").mockResolvedValueOnce(false)
    const hash = await sut.hashPassword(password, salt)
    const isValid = await sut.compare(faker.internet.password(), hash)
    expect(isValid).toBeFalsy()
    expect(BcryptAdapter.prototype.compare).toHaveBeenCalledOnce()
  })
})
