import {IJWTPayload} from './interface'

declare module 'express-serve-static-core' {
    interface Request {
        payload?: IJWTPayload
        user?: IReqUser
        file?: any
    }
}
 
namespace Express {
    interface Request {
        image?: string
    }
}