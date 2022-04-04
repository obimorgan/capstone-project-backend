/** @format */

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import createHttpError from 'http-errors'
import userRouter from './services/users'
import gamesRouter from './services/game'
import adminRouter from './services/admin'
import oauthRouter from './googleOauth'
import passport from 'passport'
import googleStrategy from './googleOauth/googleAuth'

const server = express()
server.use(cors({ origin: true, credentials: true }))
server.use(express.json())
server.use(cookieParser())
passport.use('google', googleStrategy)
server.use(passport.initialize())

server.use('/user', userRouter)
server.use('/games', gamesRouter)
server.use('/admin', adminRouter)
server.use('/oauth', oauthRouter)

export default server
