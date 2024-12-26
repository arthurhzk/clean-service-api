export type RegistrationRequest = {
  body: {
    email: string
    name: string
    password: string
    passwordConfirmation: string
  }
}
