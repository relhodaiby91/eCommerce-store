import supertest from 'supertest'

import app from '../../server'
import { product } from '../../models/product.model'
import { user } from '../../models/user.model'

const request = supertest(app)

const testUser: user = {
    id: 1,
    firstname: 'test-USER',
    lastname: 'user-last-name',
    password: 'testtest',
}
let token: string

describe('testing USERS ROUTES', () => {
    const testProduct: product = {
        id: 1,
        name: 'test product',
        price: 12000,
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

    it('CREATE NEW PRODUCT', async () => {
        await request
            .post('/newproduct')
            .send({
                name: testProduct.name,
                price: testProduct.price,
            })
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })

    it('CREATE NEW PRODUCT with invalild token ', async () => {
        await request
            .post('/newproduct')
            .send({
                name: testProduct.name,
                price: testProduct.price,
            })
            .set('Authorization', `bearer wrong token`)
            .expect(401)
    })

    it('index all PRODUCTS', async () => {
        await request.get('/products').expect(200)
    })

    it('shows a product', async () => {
        await request.get(`/product/${testProduct.id}`).expect(200)
    })
})
