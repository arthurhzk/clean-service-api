import { RegistrationController } from "@/presentation/controllers"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { faker } from "@faker-js/faker"
import { StatusCodes } from "http-status-codes"
import { ServerError, UnauthorizedError } from "@/shared/helpers/http-helper"
describe("Registration Controller", () => {
  let sut: RegistrationController

  beforeEach(() => {
    sut = new RegistrationController()
  })

  it("should return 400 if no email is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        email: undefined,
        name: faker.person.firstName(),
        password: faker.internet.password(),
        passwordConfirmation: faker.internet.password()
      }
    })

    sut.handle(httpResponse)
    expect(httpResponse.status).toBe(StatusCodes.BAD_REQUEST)
    expect(httpResponse.body).toEqual(new UnauthorizedError("Email is required"))
  })
  it("should return 400 if no name is provided", async () => {
    const httpResponse = await sut.handle({
      body: {
        name: undefined,
        email: faker.internet.email(),
        password: faker.internet.password(),
        passwordConfirmation: faker.internet.password()
      }
    })

    sut.handle(httpResponse)
    expect(httpResponse.status).toBe(StatusCodes.BAD_REQUEST)
    expect(httpResponse.body).toEqual(new UnauthorizedError("Name is required"))
  })

  it("should return 400 if password and passwordConfirmation does not match", async () => {
    const httpResponse = await sut.handle({
      body: {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        passwordConfirmation: faker.internet.password()
      }
    })
    expect(httpResponse.status).toBe(StatusCodes.BAD_REQUEST)
    expect(httpResponse.body).toEqual(new UnauthorizedError("Password and password confirmation does not match"))
  })
  it("should return 400 if email is invalid", async () => {
    const password = faker.internet.password()
    const httpResponse = await sut.handle({
      body: {
        name: faker.person.firstName(),
        email: faker.internet.protocol(),
        password: password,
        passwordConfirmation: password
      }
    })
    sut.handle(httpResponse)
    expect(httpResponse.status).toBe(StatusCodes.BAD_REQUEST)
    expect(httpResponse.body).toEqual(new UnauthorizedError("Invalid email"))
  }),
    it("should return 200 if user is created", async () => {
      const samePassword = faker.internet.password()
      const httpResponse = await sut.handle({
        body: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: samePassword,
          passwordConfirmation: samePassword
        }
      })
      expect(httpResponse.status).toBe(StatusCodes.OK)
      expect(httpResponse.body).toEqual({ message: "User created with success!" })
    })
  it("should return 500 if an error occurs", async () => {
    vi.spyOn(sut, "handle").mockRejectedValueOnce(new ServerError("Internal Server Error"))
    const samePassword = faker.internet.password()
    const httpResponse = await sut
      .handle({
        body: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: samePassword,
          passwordConfirmation: samePassword
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
