import { Document, Model, Types } from 'mongoose'

export interface IUser extends Document{
    _id: string
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

export interface INewuser {
    _id: string
    name: string
    email: string
    facebookId: string
    googleId: string
    instagram: string
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
        accessToken: string
        refreshToken: string
    }
}
