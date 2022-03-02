import express from 'express'
import cors from 'cors'
import createHttpError from 'http-errors'

const server = express()
server.use(cors())

export default server