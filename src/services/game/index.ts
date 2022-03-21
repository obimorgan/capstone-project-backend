import { Router, Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import gameModel from './schema'

const gamesRouter = Router()

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
            next(createHttpError(400, "Game does not exist"))
        }
    })

    .get('/:id/hole1', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const game = await gameModel.findById(req.params.id)
            if (!game) throw createHttpError(404, "Game does not exist")
            const hole1 = game.hole1
            res.send(hole1)
        } catch (error) {
            next(createHttpError(400, "Game does not exist"))
        }
    })

    .get('/:id/hole2', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentGame = await gameModel.findById(req.params.id)
            if (currentGame) {
                const hole = currentGame.hole2
                res.status(200).send(hole.reverse().reverse())
            } else { next(createHttpError(400, "Bad Request")) }
        } catch (error) {
            next(createHttpError(400, "Game does not exist"))
        }
    })

    .get('/:id/hole3', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentGame = await gameModel.findById(req.params.id)
            if (currentGame) {
                const hole = currentGame.hole3
                res.status(200).send(hole.reverse().reverse())
            } else { next(createHttpError(400, "Bad Request")) }
        } catch (error) {
            next(createHttpError(400, "Game does not exist"))
        }
    })

export default gamesRouter


