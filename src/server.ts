import express from 'express'
import cors from 'cors'
import createHttpError from 'http-errors'
import userRouter from './services/users'
import gamesRouter from './services/game'

const server = express()
server.use(cors())
server.use(express.json())

server.use("/user", userRouter)
server.use("/games", gamesRouter)

export default server


 