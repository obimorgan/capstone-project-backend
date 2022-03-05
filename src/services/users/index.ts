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
            // res.cookie('accessToken', accessJWT, { httpOnly: true, secure: NODE_ENV === "production" ? true : false, sameSite: NODE_ENV === "production" ? "none" : undefined})
            // res.cookie('refreshToken', refreshJWT, { httpOnly: true, secure: NODE_ENV === "production" ? true : false, sameSite: NODE_ENV === "production" ? "none" : undefined})
            res.cookie('accessToken', accessJWT)
            res.cookie('refreshToken', refreshJWT)
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
            // res.cookie('accessToken', accessJWT, { httpOnly: true, secure: NODE_ENV === "production" ? true : false, sameSite: NODE_ENV === "production" ? "none" : undefined})
            // res.cookie('refreshToken', refreshJWT, { httpOnly: true, secure: NODE_ENV === "production" ? true : false, sameSite: NODE_ENV === "production" ? "none" : undefined})
            res.cookie('accessToken', accessJWT)
            res.cookie('refreshToken', refreshJWT)
            res.status(201).send({accessJWT, refreshJWT})
            console.log(user)
            } else { next(createHttpError(401, "Invalid credentials")) }
        } catch (error) {
            next(error)
        }
    })
    
    .post("/refreshToken", async (req, res, next) => {
        try {
            const { currentRefreshToken } = req.body;
            const { accessJWT, refreshJWT } =
            await verifyJWTsAndRegenerate(currentRefreshToken);
            // res.cookie('accessToken', accessJWT, { httpOnly: true, secure: NODE_ENV === "production" ? true : false, sameSite: NODE_ENV === "production" ? "none" : undefined})
            // res.cookie('refreshToken', refreshJWT, { httpOnly: true, secure: NODE_ENV === "production" ? true : false, sameSite: NODE_ENV === "production" ? "none" : undefined})
            res.cookie('accessToken', accessJWT)
            res.cookie('refreshToken', refreshJWT)
            res.send();
        } catch (error) {
            next(error);
        }
    })

    // .get('/me', JWTAuth, async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         if (req.payload) {
    //             const user = await userModel.findById(req.payload._id).populate({ path: 'conversations', populate: { path: 'members' }})
    //             user ? res.send(user) : next(createHttpError(404, `User with id ${req.payload._id} does not exist.`))
    //         } else {
    //             next(createHttpError(400, 'Invalid request.'))
    //     }
    //     } catch (error) {
    //         next(error)
    //     }
    //     // try {
    //     //     // if (req.payload) {
    //     //     //     const user = await userModel.findById(req.payload._id)
    //     //     //     res.send(user)
    //     //     // } else {
    //     //     //     next(createHttpError(401, "Invslid request"))
    //     //     // }
    //     //     const user = await userModel.find()
    //     //     res.send(user)
    //     //     console.log(user)
    //     // } catch (error) {
    //     //     next(error)
    //     // }
    // })

    .get('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.payload) {
            const user = await userModel.findById(req.payload._id)
            user ? res.send(user) : next(createHttpError(404, `User with id ${req.payload._id} does not exist.`))
            console.log(user)
        } else {
            next(createHttpError(400, 'Invalid request.'))
        }
    } catch (error) {
        next(error)
    }
})
        
export default userRouter