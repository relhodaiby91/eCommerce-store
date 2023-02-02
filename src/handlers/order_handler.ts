import express, { Request, Response } from 'express'

import { order, orders } from '../models/order.model'

import verifyAuthToken from '../middlewares/verifyToken'
// const app = require('express');
const orderList = new orders()

const index = async (req: Request, res: Response) => {
    try {
        const allOrders = await orderList.index()
        res.json(allOrders)
    } catch (error) {
        throw new Error(`order hanlder index error ${error}`)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const userid = req.params.id
        const userOrder = await orderList.show(userid)
        res.json(userOrder)
    } catch (error) {
        throw new Error(`order hanlder show error ${error}`)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: order = {
            status: req.body.status,
            user_id: req.body.userid,
        }
        const orderCreated = await orderList.create(order)
        res.json(orderCreated)
    } catch (error) {
        throw new Error(` this is order handler error ${error}`)
    }
}

export const orders_routes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index)
    app.get('/userOrder/:id', verifyAuthToken, show)
    app.post('/order/create', verifyAuthToken, create)
}

export default orders_routes
