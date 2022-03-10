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

    .get('/currentgame/:gamePin', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gamePin = req.params
            console.log(gamePin)
            const currentgame = await gameModel.findOne(gamePin)
            res.status(200).send(currentgame)
        } catch (error) {
            next(createHttpError(400, "Game does not exist"))
        }
    })

export default gamesRouter