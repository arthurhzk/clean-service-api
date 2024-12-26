import { badRequest, ServerError, UnauthorizedError } from "@/shared/helpers/http-helper"
import { Controller } from "@/shared/protocols/controller"
import { HttpResponse } from "@/shared/protocols/http"
import { EmailValidatorAdapter } from "@/shared/adapters/email-validator/email-validator.adapter"
import { Authentication } from "@/domain/authentication/authentication-request"

export class AuthenticationController implements Controller {
  async handle(request: Authentication.Request): Promise<HttpResponse> {
    try {
      const requiredFields = ["email", "password"]
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new UnauthorizedError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`))
        }
        const validateEmail = new EmailValidatorAdapter().isValid(request.body.email)
        if (!validateEmail) {
          return badRequest(new UnauthorizedError("Invalid email"))
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
