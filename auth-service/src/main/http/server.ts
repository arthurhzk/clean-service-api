import fastify from "fastify"
import dotenv from "dotenv"
const server = fastify()

dotenv.config()

server.listen({ port: +process.env.PORT }, () => console.log(`Server is running on port ${process.env.PORT}`))
