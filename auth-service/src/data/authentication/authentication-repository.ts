import { Authentication, AuthenticationService } from "@/domain/authentication/authentication-request"
import { AuthenticationProtocol } from "@/data/authentication/authentication-protocol"

export class AuthenticationRepository implements AuthenticationProtocol {
  constructor(private readonly authenticationService: AuthenticationService) {}
  async auth(data: Authentication.Request): Promise<Authentication.Response> {
    return await this.authenticationService.authenticate(data)
  }
}
