import {IJWTPayload} from './interface'

declare module 'express-serve-static-core' {
    interface Request {
        payload?: IJWTPayload
        user?: IReqUser
        file?: any
    }
    interface Response {
        accessJWT: string
    }
}
 
namespace Express {
    interface Request {
        image?: string
    }
}