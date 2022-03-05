import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import createHttpError from 'http-errors'
import userRouter from './services/users'
import gamesRouter from './services/game'

const server = express()
// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//     },
//     credentials: true
// }
// server.use(cors(corsOptions))
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use("/user", userRouter)
server.use("/games", gamesRouter)

export default server


 