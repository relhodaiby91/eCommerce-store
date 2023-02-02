import supertest from 'supertest'

import app from '../../server'
import { user } from '../../models/user.model'
// import { JwtPayload, verify, Jwt } from 'jsonwebtoken';s
const request = supertest(app)

const testUser: user = {
    id: 1,
    firstname: 'test-USER',
    lastname: 'user-last-name',
    password: 'testtest',
}
let token: string

describe('testing USERS ROUTES', () => {
    beforeAll(async () => {
        const req = await request.post('/newuser').send({
            firstname: testUser.firstname,
            lastname: testUser.lastname,
            password: testUser.password,
        })
        console.log(req.body)
        token = req.body
    })

    it('authernticate ', async () => {
        await request
            .post('/sign-in')
            .send({
                firstname: testUser.firstname,
                password: testUser.password,
            })
            .expect(200)
    })

    it('show ', async () => {
        await request
            .get(`/user/${testUser.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })
})
