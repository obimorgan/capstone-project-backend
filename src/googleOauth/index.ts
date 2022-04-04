/** @format */

import express, { NextFunction, Response, Request } from 'express'
import passport from 'passport'

const { FE_URL } = process.env

const oauthRouter = express.Router()

oauthRouter

	.get('/google', passport.authenticate('google', { scope: ['profile'] }))

	.get('/googleRedirect', passport.authenticate('google'), async (req: Request, res: Response, next: NextFunction) => {
		try {
			// console.log('TOKENS: ', req.user.tokens)
			res.cookie('accessToken', req.user.tokens.accessJWT, { httpOnly: true, secure: false })
			res.cookie('refreshToken', req.user.tokens.refreshJWT, { httpOnly: true, secure: false })
			res.cookie('googleId', req.user.googleId, { httpOnly: true, secure: false })
			res.redirect(`${process.env.FE_URL}`)
		} catch (error) {
			next(error)
		}
	})

export default oauthRouter

// .get(
// 	'/callback',
// 	passport.authenticate('facebook', { failureRedirect: `${FE_URL}/register` }),
// 	async (req, res, next) => {
// 		try {
// 			console.log(req.user)

// 			res.cookie('accessToken', req.user.tokens.accessJWT, { httpOnly: true, secure: false })
// 			res.cookie('refreshToken', req.user.tokens.refreshJWT, { httpOnly: true, secure: false })
// 			res.cookie('facebookId', req.user.facebookId, { httpOnly: true, secure: false })
// 			res.redirect(`${FE_URL}/facebook`)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	},
// )
