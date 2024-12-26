import { describe, it, expect, beforeEach, vi } from "vitest"
import { faker } from "@faker-js/faker"
import { StatusCodes } from "http-status-codes"
import { AuthenticationController } from "@/presentation/controllers/authentication/authentication.controller"
import { ServerError, UnauthorizedError } from "@/shared/helpers/http-helper"
describe("Authentication Controller", () => {
  let sut: AuthenticationController
  beforeEach(() => {
    sut = new AuthenticationController()
  })
  it("should return 400 if no email is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        email: undefined,
        password: faker.internet.password()
      }
    })
    sut.handle(httpResponse)
    expect(httpResponse.status).toBe(StatusCodes.BAD_REQUEST)
    expect(httpResponse.body).toEqual(new UnauthorizedError("Email is required"))
  })
  it("should return 400 if no password is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        email: faker.internet.email(),
        password: undefined
      }
    })
    sut.handle(httpResponse)
    expect(httpResponse.status).toBe(StatusCodes.BAD_REQUEST)
    expect(httpResponse.body).toEqual(new UnauthorizedError("Password is required"))
  })
  it("should return 500 if an error occurs", async () => {
    vi.spyOn(sut, "handle").mockRejectedValueOnce(new ServerError("Internal Server Error"))
    const samePassword = faker.internet.password()
    const httpResponse = await sut
      .handle({
        body: {
          email: faker.internet.email(),
          password: samePassword
        }
      })
      .catch((error) => {
        return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          body: new ServerError(error.stack)
        }
      })

    expect(httpResponse.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(httpResponse.body).toBeInstanceOf(ServerError)
  })
})
