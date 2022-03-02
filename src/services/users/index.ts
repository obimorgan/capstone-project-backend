import express, { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import { provideTokens } from '../../middlewares/JWTauth';
import userModel from './schema';

const userRouter = express.Router();
const { NODE_ENV } = process.env

userRouter
    .post('/register', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body
            const newUser = new userModel({
                ...req.body,
                avatar: req.file?.path || `https://ui-avatars.com/api/?name=${name}`,
                filename: req.file?.filename
            })
            await newUser.save()
            const { accessJWT, refreshJWT } = await provideTokens(newUser)
            res.status(201).send({ accessJWT, refreshJWT })
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
                res.status(201).send({ accessJWT, refreshJWT })
            } else { next(createHttpError(401, "Invalid credentials")) }
        } catch (error) {
            next(error)
        }
    })
        
export default userRouter