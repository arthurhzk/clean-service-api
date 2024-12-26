import { Controller } from "@/shared/protocols/controller"

import { FastifyRequest, FastifyReply } from "fastify"

export const adaptRoute = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const request = {
      body: req.body ?? {},
      params: req.params ?? {}
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      res.status(httpResponse.status).send(httpResponse.body)
    } else {
      res.status(httpResponse.status).send({
        error: httpResponse.body.message
      })
    }
  }
}
