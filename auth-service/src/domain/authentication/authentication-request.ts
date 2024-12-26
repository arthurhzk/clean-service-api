export namespace Authentication {
  export type Request = {
    body: {
      email: string
      password: string
    }
  }
  export type Response = {
    token: string
  }
}

export interface AuthenticationService {
  authenticate(request: Authentication.Request): Promise<Authentication.Response>
}
