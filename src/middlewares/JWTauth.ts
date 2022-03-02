import { NextFunction } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { IJWTPayload, IUser } from '../interface'
import UserModel from "../services/users/schema"

process.env.TS_NODE_DEV && require("dotenv").config()

const { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env

// export const JWTAuth = async (req: Request, res: Response, next: NextFunction) => {
//     if (!req.cookies.accessToken) {
//         next(createHttpError(401, 'No access token provided in cookies.'))
//     } else {
//         try {
//             const token = req.cookies.accessToken
//             const payload = verifyJWT(token)
//             req.payload = { _id: (await payload)._id, email: (await payload).email }
//             next()
//         } catch (error) {
//             next(createHttpError(401, 'Invalid token in cookies.'))
//         }
//     }
// }

const generateJWT = (payload: IJWTPayload): Promise<string> => {
    return new Promise((resolve, reject) =>
        jwt.sign(payload, JWT_SECRET_KEY!, { expiresIn: '15m' }, (err, token) => {
            err ? reject(err) : resolve(token as string)
        }))
}

const generateRefreshJWT = (payload: IJWTPayload): Promise<string> => {
    return new Promise((resolve, reject) =>
        jwt.sign(payload, JWT_REFRESH_SECRET_KEY!, { expiresIn: '1 week' }, (err, token) => {
            err ? reject(err) : resolve(token as string)
        }))
}

export const provideTokens = async (user: IUser) => {
    const accessJWT = await generateJWT({ _id: user._id, email: user.email })
    const refreshJWT = await generateRefreshJWT({ _id: user._id, email: user.email })
    user.refreshToken = refreshJWT
    await user.save()
    return { accessJWT, refreshJWT }
}

export const verifyJWT = (token: string): Promise<IJWTPayload> => {
    return new Promise((resolve, reject) =>
        jwt.verify(token, JWT_SECRET_KEY!, (err, payload) => {
            err ? reject(err) : resolve(payload as IJWTPayload)
        }))
}

const verifyRefreshJWT = (token: string): Promise<IJWTPayload> => {
    return new Promise((resolve, reject) =>
        jwt.verify(token, JWT_REFRESH_SECRET_KEY!, (err, payload) => {
            err ? reject(err) : resolve(payload as IJWTPayload)
        }))
}

export const verifyJWTsAndRegenerate = async (currentRefreshJWT: string) => {
    try {
        const payload = await verifyRefreshJWT(currentRefreshJWT)
        const user = await UserModel.findById(payload._id)
        if (!user) throw createHttpError(404, `User with id ${payload._id} does not exist.`)
        const { accessJWT, refreshJWT } = await provideTokens(user)
        user.refreshToken = refreshJWT
        await user.save()
        return { accessJWT, refreshJWT }
    } catch (error) {
        throw createHttpError(401, 'Invalid refresh token.')
    }
}