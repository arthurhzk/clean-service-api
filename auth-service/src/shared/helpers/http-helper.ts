import { HttpResponse } from "@/shared/protocols/http"

export class UnauthorizedError extends Error {
  constructor(message: string = "Unauthorized") {
    super("Unauthorized")
    this.name = "UnauthorizedError"
    this.message = message
  }
}
export class ServerError extends Error {
  constructor(stack: string) {
    super("Internal server error")
    this.name = "ServerError"
    this.stack = stack
  }
}
export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  status: 403,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  status: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  status: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  status: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  status: 204,
  body: null
})
