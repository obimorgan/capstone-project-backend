import { Router, Request, Response, NextFunction } from 'express'
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

export default gamesRouter