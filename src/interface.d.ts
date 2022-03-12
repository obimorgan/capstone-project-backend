import { Document, Model, Types } from 'mongoose'

interface IUser extends Document{
    _id: string
    name: string
    email: string
    password: string
    filename: String
    avatar: String,
    facebokId: String
    googleId: String
    instagramId: String
    refreshJWT: String
    accessJWT?: string
    games: ISingleGame[]
}

interface INewuser {
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

 interface IUserModel extends Model<IUser> {
    authenticate(email: string, plainPW: string): IUser | null
}

interface IReqUser {
    tokens: {
        accessJWT: string
        refreshJWT: string
    }
}

interface IGame {
    _id: string
    gameName: string
    users: IUserModel[]
    scores: IHoles[]
}

export interface ISingleGame {
    _id: string
    gameName: IGame
    gamePin: string
    hole1: number,
    hole2: number,
    hole3: number,
    hole4: number,
    hole5: number,
    hole6: number,
    hole7: number,
    hole8: number,
    hole9: number,
    hole10: number,
    hole11: number,
    hole12: number,
    hole13: number,
    hole14: number,
    hole15: number,
    hole16: number,
    hole17: number,
    hole18: number,
    hole19: number,
}
