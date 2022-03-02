import express from 'express'
import cors from 'cors'
import createHttpError from 'http-errors'
import userRouter from './services/users'

const server = express()
server.use(cors())
server.use(express.json())

server.use("/user", userRouter)

export default server

