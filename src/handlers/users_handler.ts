import express, { Request, Response } from 'express'

import { user, userStore } from '../models/user.model'

import jwt from 'jsonwebtoken'

import verifyAuthToken from '../middlewares/verifyToken'

const mainUserList = new userStore()

const index = async (req: Request, res: Response) => {
    try {
        const users = await mainUserList.index()

        res.json(users)
    } catch (error) {
        throw new Error(`this is user handler INDEX ${error}`)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const userid = req.params.id
        // @ts-ignore
        const userID = await mainUserList.show(userid)

        res.json(userID)
    } catch (error) {
        throw new Error(`this is user handler show ${error}`)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const createNewUser: user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        }
        const createUser = await mainUserList.create(createNewUser)
        var token = jwt.sign(
            { createNewUser: createUser },
            process.env.TOKEN_SECRET!
        )
        res.json(token)
    } catch (error) {
        throw new Error(`this is user handler create ${error}`)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const user: user = {
            firstname: req.body.firstname,
            password: req.body.password,
        }
        const signedin = await mainUserList.authenticate(
            user.firstname,
            user.password
        )
        var token = jwt.sign({ user: signedin }, process.env.TOKEN_SECRET!)
        res.json(token)
    } catch (error) {
        res.status(401)
        res.json(error)
    }
}

export const users_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/user/:id', verifyAuthToken, show)
    app.post('/newuser', create)
    app.post('/sign-in', authenticate)
}
