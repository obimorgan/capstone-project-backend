/** @format */

import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import { provideTokens } from '../middlewares/JWTauth'
import userModel from '../services/users/schema'

process.env.TS_NODE_DEV && require('dotenv').config()
const { GOOGLE_OAUTH_SECRET, GOOGLE_OAUTH_ID } = process.env

const googleStrategy = new GoogleStrategy.Strategy(
	{
		clientID: process.env.GOOGLE_OAUTH_ID!,
		clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
		callbackURL: `http://localhost:3001/oauth/googleRedirect`,
	},
	async (accessToken: string, refreshToken: string, profile: any, passportNext: any) => {
		try {
			console.log(profile)
			const user = await userModel.findOne({ googleId: profile.id })
			if (user) {
				const tokens = await provideTokens(user)
				passportNext(null, { tokens })
			} else {
				const newUser = new userModel({
					name: profile.name.givenName,
					email: profile._json.email,
					googleId: profile.id,
				})
				const savedUser = await newUser.save()
				const tokens = await provideTokens(savedUser)
				passportNext(null, { tokens })
			}
		} catch (error) {
			console.log(error)
		}
	},
)

passport.serializeUser(function (data, passportNext) {
	// if you don't have this function, passport will trigerr a "failed to serialize" error
	passportNext(null, data)
})

export default googleStrategy
