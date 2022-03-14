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

    // .put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const currentGame = await gameModel.findById(req.params.id)
    //         if (!currentGame) return createHttpError(400, "Game does not exist")
    //         const currentPlayer = await userModel
    //     } catch (error) {
    //         next(createHttpError(400, "Game does not exist"))
    //     }
    // })

    // .put('')

export default gamesRouter