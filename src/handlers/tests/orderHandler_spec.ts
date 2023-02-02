import supertest from 'supertest'

import app from '../../server'
import { user } from '../../models/user.model'
import { order } from '../../models/order.model'
// import { JwtPayload, verify, Jwt } from 'jsonwebtoken';s
const request = supertest(app)

const testUser: user = {
    id: 1,
    firstname: 'test-USER',
    lastname: 'user-last-name',
    password: 'testtest',
}
let token: string

describe('testing ORDERS ROUTES', () => {
    const testorder: order = {
        id: 3,
        status: 'active',
        user_id: '9',
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

    it(' test INDEX METHOD for ORDERS', async () => {
        await request
            .get('/orders')
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })

    it(' test show METHOD for ORDERS', async () => {
        await request
            .get(`/userorder/${testorder.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })

    it(' test create METHOD for ORDERS', async () => {
        await request
            .get(`/userorder/${testorder.id}`)
            .send({
                status: testorder.status,
                user_id: testorder.user_id,
            })
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })

    it(' test create METHOD for ORDERS with invalid token', async () => {
        await request
            .get(`/userorder/${testorder.id}`)
            .send({
                status: testorder.status,
                user_id: testorder.user_id,
            })
            .set('Authorization', `bearer `)
            .expect(401)
    })
})
