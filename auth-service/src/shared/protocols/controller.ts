import { HttpResponse } from "@/shared/protocols/http"

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
