import { badRequest, ServerError, UnauthorizedError } from "@/shared/helpers/http-helper"
import { Controller } from "@/shared/protocols/controller"
import { HttpResponse } from "@/shared/protocols/http"

type AuthenticationRequest = {
  body: {
    email: string
    password: string
  }
}

export class AuthenticationController implements Controller {
  async handle(request: AuthenticationRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["email", "password"]
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new UnauthorizedError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`))
        }
      }
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return badRequest(error)
      }
      return new Promise((_resolve, reject) => reject(new ServerError(error.stack)))
    }
  }
}
