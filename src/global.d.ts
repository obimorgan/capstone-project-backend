import { IJWTPayload } from "./users"
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