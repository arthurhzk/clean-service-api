import { AuthenticationRepository } from "@/data/authentication/authentication-repository"
import { AuthenticationService } from "@/domain/authentication/authentication-request"
import { describe, expect, it, vi } from "vitest"

describe("AuthenticationRepository", () => {
  it("should have an constructor that receives AuthenticationService", () => {
    const mockAuthenticationService = {} as AuthenticationService
    let service = new AuthenticationRepository(mockAuthenticationService)
    expect(service).toBeDefined()
    expect(service).toBeInstanceOf(AuthenticationRepository)
  })
})
