/** @format */

import express, { NextFunction, Response, Request } from 'express'
import createHttpError from 'http-errors'
import adminModel from './schema'

const adminRouter = express.Router()

adminRouter
	.post('/', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const rules = new adminModel(req.body)
			await rules.save()
			res.sendStatus(200)
		} catch (error) {
			next(error)
		}
	})
	.get('/', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const rules = await adminModel.find()
			const arrayOfRules = rules[0].rules
			res.status(200).send(arrayOfRules)
		} catch (error) {
			next(error)
		}
	})

export default adminRouter
