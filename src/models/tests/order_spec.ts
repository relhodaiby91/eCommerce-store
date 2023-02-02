import { order, orders } from '../order.model'

const TEST = new orders()

describe('test orders model methods', () => {
    const test: order = {
        status: 'status',
        user_id: '1',
    }
    it('index users', async () => {
        await TEST.create(test)
        const result = await TEST.index()

        expect(result.length).toBeGreaterThan(0)
    })

    it('Must have creat method', async () => {
        const create = await TEST.create(test)

        expect(create.status).toEqual('status')
    })

    it('Must have show method', () => {
        expect(TEST.show).toBeDefined()
    })
})
