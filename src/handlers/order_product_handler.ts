import express, { Request, Response } from 'express'
import verifyToken from '../middlewares/verifyToken'

import { productOrder, productOrders } from '../models/order_product.model'

const ORDERS = new productOrders()

const index = async (req: Request, res: Response) => {
    try {
        const showall = await ORDERS.index()
        res.json(showall)
    } catch (error) {
        throw new Error(` order-product index error ${error}`)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const userid = req.params.id
        const showOneOrder = await ORDERS.show(userid)
        res.json(showOneOrder)
    } catch (error) {
        throw new Error(` order-product show error ${error}`)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const productORDER: productOrder = {
            product_id: req.body.pid,
            quantity: req.body.q,
            user_id: req.body.id,
        }

        const created = await ORDERS.addProduct(
            productORDER.product_id,
            productORDER.quantity,
            productORDER.user_id
        )
        res.json(created)
    } catch (error) {
        res.status(404)
        res.status(400)
        res.status(401)
        res.json(error)
    }
}

export const order_products_routes = (app: express.Application) => {
    app.get('/orderproducts', verifyToken, index)
    app.get('/orderINorders/:id', verifyToken, show)
    app.post('/createdOrders', verifyToken, create)
}

export default order_products_routes
