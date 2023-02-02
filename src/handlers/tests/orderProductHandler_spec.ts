import supertest from 'supertest'

import app from '../../server'
import { user } from '../../models/user.model'
import { productOrder } from '../../models/order_product.model'
// import { JwtPayload, verify, Jwt } from 'jsonwebtoken';s
const request = supertest(app)

const testUser: user = {
    id: 1,
    firstname: 'test-USER',
    lastname: 'user-last-name',
    password: 'testtest',
}
let token: string

describe('testing ORDER-PRODUCTs ROUTES', () => {
    const PO: productOrder = {
        id: 80,
        product_id: '7',
        quantity: 85,
        user_id: '3',
    }
    beforeAll(async () => {
        const req = await request.post('/newuser').send({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
            password: testUser.password,
        })
        console.log(req.body)
        token = req.body
    })

    it('index method ', async () => {
        await request
            .get('/orderproducts')
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })

    it(' show ', async () => {
        await request
            .get(`/orderINorders/${PO.user_id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })

    it(' create ', async () => {
        await request
            .post('/createdOrders')
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })
})
