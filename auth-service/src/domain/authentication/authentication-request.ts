export namespace Authentication {
  export type Request = {
    email: string
    password: string
    name?: string
  }
  export type Response = {
    token: string
  }
}

export interface AuthenticationService {
  authenticate(request: Authentication.Request): Promise<Authentication.Response>
}
