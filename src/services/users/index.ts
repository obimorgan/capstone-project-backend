import express, { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import { JWTAuth, provideTokens, verifyJWTsAndRegenerate } from '../../middlewares/JWTauth';
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
            res.cookie('accessToken', accessJWT, { httpOnly: true, secure: false, sameSite: 'none'})
            res.cookie('refreshToken', refreshJWT, { httpOnly: true, secure: false, sameSite: 'none'})
            res.status(201).send({accessJWT, refreshJWT})
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
            res.cookie('accessToken', accessJWT, { httpOnly: true, secure: false, sameSite: 'none'})
            res.cookie('refreshToken', refreshJWT, { httpOnly: true, secure: false, sameSite: 'none'})
            res.status(201).send({accessJWT, refreshJWT})
            console.log(res.cookie)
            } else { next(createHttpError(401, "Invalid credentials")) }
        } catch (error) {
            next(error)
        }
    })
    
    .post("/refreshToken", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            const { accessJWT, refreshJWT } =
            await verifyJWTsAndRegenerate(refreshToken);
            res.cookie('accessToken', accessJWT, { httpOnly: true, secure: false, sameSite: 'none'})
            res.cookie('refreshToken', refreshJWT, { httpOnly: true, secure: false, sameSite: 'none'})
            res.send('Tokens sent');
        } catch (error) {
            next(error);
        }
    })

    // not able to get accesstoken --> using the id instead of the token
    .get('/me/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
        const id = req.params.id;
        if (id) {
            console.log(req.payload)
            const user = await userModel.findById(id)
            res.send(user)
            console.log(user)
        } else {
            next(createHttpError(400, 'Invalid request.'))
        }
    } catch (error) {
        next(error)
    }
})
        
export default userRouter