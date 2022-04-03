/** @format */

import { Document, Model, Types } from 'mongoose'

interface IUser extends Document {
	_id: string
	name: string
	email: string
	password: string
	filename: string
	avatar: string
	facebokId: String
	googleId: string
	instagramId: String
	refreshJWT: String
	accessJWT?: string
	bestScore?: number
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
	_id: string
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

export interface IHole {
	player: string
	score: Number
}

export interface IAdmin {
	rules: ISingleRule[]
}

interface ISingleRule {
	rule: string
}
