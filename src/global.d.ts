declare module 'express-serve-static-core' {
    interface Request {
        payload?: IJWTPayload
        user?: IReqUser
    }
}

namespace Express {
    interface Request {
        image?: string
    }
}