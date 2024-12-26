import { HttpResponse } from "@/shared/protocols/http"
import { Controller } from "@/shared/protocols/controller"
import { badRequest, ok, ServerError, UnauthorizedError } from "@/shared/helpers/http-helper"

type RegistrationRequest = {
  body: {
    email: string
    name: string
    password: string
    passwordConfirmation: string
  }
}

export class RegistrationController implements Controller {
  async handle(request: RegistrationRequest): Promise<HttpResponse> {
    try {
      const { password, passwordConfirmation } = request.body

      const requiredFields = ["email", "name"]
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new UnauthorizedError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`))
        }
      }
      if (password !== passwordConfirmation) {
        return badRequest(new UnauthorizedError("Password and password confirmation does not match"))
      }
      return ok({ message: "User created with success!" })
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return badRequest(error)
      }
      return new Promise((_resolve, reject) => reject(new ServerError(error.stack)))
    }
  }
}
