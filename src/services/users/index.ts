/** @format */

import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { JWTAuth, provideTokens, verifyJWTsAndRegenerate } from '../../middlewares/JWTauth'
import { parser } from '../../utils/cloudinary'
import userModel from './schema'

const userRouter = express.Router()
const { NODE_ENV } = process.env

userRouter
	.post('/register', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name } = req.body
			const newUser = new userModel({
				...req.body,
				avatar: req.file?.path || `https://ui-avatars.com/api/?name=${name}`,
				filename: req.file?.filename,
			})
			await newUser.save()
			const { accessJWT, refreshJWT } = await provideTokens(newUser)
			res.cookie('accessToken', accessJWT, {
				httpOnly: true,
				secure: NODE_ENV === 'production' ? true : false,
				sameSite: NODE_ENV === 'production' ? 'none' : undefined,
			})
			res.cookie('refreshToken', refreshJWT, {
				httpOnly: true,
				secure: NODE_ENV === 'production' ? true : false,
				sameSite: NODE_ENV === 'production' ? 'none' : undefined,
			})
			res.status(201).send({ accessJWT, refreshJWT })
			console.log(newUser)
		} catch (error) {
			console.log(error)
			next(error)
		}
	})

	.post('/login', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body
			const user = await userModel.authenticate(email, password)
			if (user) {
				const { accessJWT, refreshJWT } = await provideTokens(user)
				res.cookie('accessToken', accessJWT, {
					httpOnly: true,
					secure: NODE_ENV === 'production' ? true : false,
					sameSite: NODE_ENV === 'production' ? 'none' : undefined,
				})
				res.cookie('refreshToken', refreshJWT, {
					httpOnly: true,
					secure: NODE_ENV === 'production' ? true : false,
					sameSite: NODE_ENV === 'production' ? 'none' : undefined,
				})
				res.status(201).send({ accessJWT })
			} else {
				next(createHttpError(401, 'Invalid credentials'))
			}
		} catch (error) {
			next(createHttpError(401, 'Invalid credentials.'))
		}
	})

	.post('/refreshToken', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies
			const { accessJWT, refreshJWT } = await verifyJWTsAndRegenerate(refreshToken)
			res.cookie('accessToken', accessJWT, {
				httpOnly: true,
				secure: NODE_ENV === 'production' ? true : false,
				sameSite: NODE_ENV === 'production' ? 'none' : undefined,
			})
			res.cookie('refreshToken', refreshJWT, {
				httpOnly: true,
				secure: NODE_ENV === 'production' ? true : false,
				sameSite: NODE_ENV === 'production' ? 'none' : undefined,
			})
			console.log('refreshToken')
			res.send('Tokens sent')
		} catch (error) {
			next(error)
		}
	})

	.get('/me', JWTAuth, async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (req.payload) {
				const user = await userModel.findById(req.payload._id)
				if (user) {
					res.send(user)
				} else next(createHttpError(404, `There is no user with this Id: ${req.payload._id}`))
			} else next(createHttpError(400, 'Invalid request.'))
		} catch (error) {
			next(error)
		}
	})

	.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (req.params.id) {
				const user = await userModel.findById(req.params.id)
				if (user) {
					res.send(user)
				} else next(createHttpError(404, `There is no user with this Id: ${req.params.id}`))
			} else next(createHttpError(400, 'Invalid request.'))
		} catch (error) {
			next(error)
		}
	})

	.get('/', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await userModel.find()
			if (user) {
				res.send(user)
			} else next(createHttpError(400, 'Invalid request.'))
		} catch (error) {
			next(error)
		}
	})

	.put('/:playerId', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { totalScore } = req.body
			console.log(totalScore)
			const user = await userModel.findById(req.params.playerId)
			if (!user) next(createHttpError(404, 'user does not exist'))
			const userCurrentBestScore = user?.bestScore
			if (userCurrentBestScore! > totalScore) {
				console.log(userCurrentBestScore)
				const updatedBestScore = await userModel.findByIdAndUpdate(
					req.params.playerId,
					{ bestScore: totalScore },
					{ new: true },
				)
				console.log("Player's best score has been updated")
			} else {
				console.log("Player's total score did not beat the current best score")
			}
			res.status(201).send("Player's best score has been updated")
		} catch (error) {
			console.log(error)
			next(createHttpError(400, 'Bad Request'))
		}
	})

	// .put('/:playerId/editprofile', async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const editedUser = await userModel.findByIdAndUpdate(req.params.playerId, req.body, { new: true })
	// 		res.sendStatus(200)
	// 	} catch (error) {
	// 		next(createHttpError(400, 'Bad Request'))
	// 	}
	// })

	.put('/:id/editprofile', parser.single('profile'), async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (req.params.id) {
				const oldUser = await userModel.findById(req.params.id)
				if (oldUser) {
					// const body = {
					// 	...req.body,
					// 	avatar: req.file?.path || oldUser.avatar,
					// 	filename: req.file?.filename || oldUser.filename,
					// }
					const editedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
					if (!editedUser) return next(createHttpError(404, `User with id ${req.params.id} does not exist.`))
					// if (oldUser.filename && req.file) {
					// 	await cloudinary.uploader.destroy(oldUser.filename)
					// }
					res.send(editedUser)
				} else {
					next(createHttpError(404, `User with id ${req.params.id} does not exist.`))
				}
			} else {
				next(createHttpError(400, 'Invalid request.'))
			}
		} catch (error) {
			next(error)
		}
	})

export default userRouter
