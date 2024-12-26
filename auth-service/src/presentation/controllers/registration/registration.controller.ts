import { HttpResponse } from "@/shared/protocols/http"
import { Controller } from "@/shared/protocols/controller"
import { badRequest, ok, ServerError, UnauthorizedError } from "@/shared/helpers/http-helper"
import { EmailValidatorAdapter } from "@/shared/adapters/email-validator/email-validator.adapter"
import { Registration } from "@/domain/registration/registration-request"

export class RegistrationController implements Controller {
  async handle(request: Registration.Request): Promise<HttpResponse> {
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
      const validateEmail = new EmailValidatorAdapter().isValid(request.body.email)
      if (!validateEmail) {
        return badRequest(new UnauthorizedError("Invalid email"))
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
