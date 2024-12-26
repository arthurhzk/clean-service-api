import { RegistrationService } from "@/domain/registration/registration-request"
import { describe, expect, it, vi } from "vitest"
import { RegistrationRepository } from "@/data/registration/registration-repository"

describe("RegistrationRepository", () => {
  it("should have an constructor that receives RegistrationService", () => {
    const mockRegistrationService = {} as RegistrationService
    let service = new RegistrationRepository(mockRegistrationService)
    expect(service).toBeDefined()
    expect(service).toBeInstanceOf(RegistrationRepository)
  })
})
