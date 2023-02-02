import express, { Request, Response } from 'express'

import { product, store } from '../models/product.model'

import verifyAuthToken from '../middlewares/verifyToken'
const app = require('express')
const mainStore = new store()

const index = async (_req: Request, res: Response) => {
    try {
        const products = await mainStore.index()
        res.json(products)
    } catch (error) {
        throw new Error(`Go to Product handler index ${error}`)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const productid = req.params.id
        const requestedProduct = await mainStore.show(productid)
        res.json(requestedProduct)
    } catch (error) {
        res.send('please enter required params')
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const newproduct: product = {
            name: req.body.name,
            price: req.body.price,
        }

        const newProducts = await mainStore.create(newproduct)
        res.json(newProducts)
    } catch (error) {
        throw new Error(` this is product handler error ${error}`)
    }
}

export const products_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/product/:id', show)
    app.post('/newproduct', verifyAuthToken, create)
}

export default products_routes
