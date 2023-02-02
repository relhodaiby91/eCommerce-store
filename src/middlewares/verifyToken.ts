import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]

        if (jwt.verify(token, process.env.TOKEN_SECRET!)) next()
    } catch (error) {
        res.status(401)

        res.json(`invalid Token: jwt token must be provided`)
    }
}

export default verifyAuthToken
