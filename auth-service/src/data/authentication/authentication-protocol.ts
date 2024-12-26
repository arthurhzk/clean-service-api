import { Authentication } from "@/domain/authentication/authentication-request"

export interface AuthenticationProtocol {
  auth: (data: Authentication.Request) => Promise<Authentication.Response>
}
