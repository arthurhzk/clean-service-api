import { beforeEach, describe, expect, it, vi } from "vitest"
import { EmailValidatorAdapter } from "./email-validator.adapter"
import { faker } from "@faker-js/faker"
describe("EmailValidatorAdapter", () => {
  beforeEach(() => vi.resetAllMocks())
  it("should return true if validator returns true", () => {
    const sut = new EmailValidatorAdapter()
    const email = faker.internet.email()
    const isEmailSpy = vi.spyOn(sut, "isValid")
    const isInvalid = sut.isValid(email)
    expect(isInvalid).toBeTruthy()
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })

  it("should return false if validator returns false", () => {
    const sut = new EmailValidatorAdapter()
    const isInvalid = sut.isValid(faker.internet.protocol())
    expect(isInvalid).toBeFalsy()
  })
})
