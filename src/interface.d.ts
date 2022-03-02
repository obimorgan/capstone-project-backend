import { Document, Model, Types } from 'mongoose'

export interface IUser extends Document{
    name: string
    email: string
    password: string
    filename: String
    avatar: String,
    facebokId: String
    googleId: String
    instagramId: String
    refreshToken: String
    games: Types.ObjectId[]
}

export interface IJWTPayload {
    _id: string,
    email: string
}

export interface IUserModel extends Model<IUser> {
    authenticate(email: string, plainPW: string): IUser | null
}

export interface IReqUser {
    tokens: {
        accessJWT: string
        refreshJWT: string
    }
}