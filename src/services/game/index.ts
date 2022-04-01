/** @format */

import { Router, Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { TypePredicateKind } from 'typescript'
import gameModel from './schema'

const gamesRouter = Router()

gamesRouter.get('/todays', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const start = new Date()
		start.setHours(0, 0, 0, 0)
		const end = new Date()
		end.setHours(23, 59, 59, 999)
		const todaysGames = await gameModel.find({ createdAt: { $gte: start, $lt: end } })
		if (!todaysGames) next(createHttpError(500, 'Server Error'))
		let players: any[] = []
		const getPlayers = todaysGames.forEach((game) => game.players.forEach((player: any) => players.push(player)))
		res.status(200).send(players)
	} catch (error) {
		console.log(error)
	}
})

gamesRouter
	.post('/create', async (req: Request, res: Response, next: NextFunction) => {
		try {
			// const {gameName} = req.body
			const newGame = new gameModel(req.body)
			await newGame.save()
			res.status(201).send(newGame)
		} catch (error) {
			next(error)
		}
	})

	.get('/', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const games = await gameModel.find()
			res.status(200).send(games)
		} catch (error) {
			console.log(error)
		}
	})

	.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const currentGame = await gameModel.findById(req.params.id)
			res.status(200).send(currentGame)
		} catch (error) {
			next(createHttpError(400, 'Game does not exist'))
		}
	})

	.put('/:id/hole1', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = [...req.body]
			const id = req.params.id
			const game = await gameModel.findById(id)
			if (!game) return next(createHttpError(404, 'Game does not exist'))
			const updatedHole = await gameModel.findByIdAndUpdate(
				id,
				{
					hole1: [...data],
				},
				{ new: true },
			)
			res.sendStatus(200)
		} catch (error) {
			next(createHttpError(400, 'Bad Request'))
			console.log(error)
		}
	})

	.put('/:id/hole2', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = [...req.body]
			const id = req.params.id
			const game = await gameModel.findById(id)
			if (!game) return next(createHttpError(404, 'Game does not exist'))
			const updatedHole = await gameModel.findByIdAndUpdate(
				id,
				{
					hole2: [...data],
				},
				{ new: true },
			)
			res.sendStatus(200)
		} catch (error) {
			next(createHttpError(400, 'Bad Request'))
			console.log(error)
		}
	})

	.put('/:id/hole3', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = [...req.body]
			const id = req.params.id
			const game = await gameModel.findById(id)
			if (!game) return next(createHttpError(404, 'Game does not exist'))
			const updatedHole = await gameModel.findByIdAndUpdate(
				id,
				{
					hole3: [...data],
				},
				{ new: true },
			)
			res.sendStatus(200)
		} catch (error) {
			next(createHttpError(400, 'Bad Request'))
			console.log(error)
		}
	})

	.put('/:id/hole4', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = [...req.body]
			const id = req.params.id
			const game = await gameModel.findById(id)
			if (!game) return next(createHttpError(404, 'Game does not exist'))
			const updatedHole = await gameModel.findByIdAndUpdate(
				id,
				{
					hole4: [...data],
				},
				{ new: true },
			)
			res.sendStatus(200)
		} catch (error) {
			next(createHttpError(400, 'Bad Request'))
			console.log(error)
		}
	})

export default gamesRouter
