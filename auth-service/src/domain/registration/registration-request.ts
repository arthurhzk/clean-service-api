export namespace Registration {
  export type Request = {
    body: {
      email: string
      name: string
      password: string
      passwordConfirmation: string
    }
  }
  export type Response = void
}

export interface RegistrationService {
  register(request: Registration.Request): Promise<Registration.Response>
}
