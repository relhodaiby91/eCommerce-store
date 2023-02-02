import { user, userStore } from '../user.model'

const testStore = new userStore()

let USER: user

describe('MODEL USER TEST', () => {
    it('user create method', async () => {
        //@ts-ignore
        USER = await testStore.create({
            id: 1,
            firstname: 'testuser',
            lastname: 'lastname',
            password: 'password',
        })
        console.log(USER.firstname)

        expect(USER.firstname).toEqual('testuser')
    })

    it('test index method', async () => {
        const index = await testStore.index()
        expect(index.length).toBeGreaterThan(0)
    })

    it('tests show method', async () => {
        const show = await testStore.show(USER.id as number)
        expect(show).toBeDefined()
    })
})
