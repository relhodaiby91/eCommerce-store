import { productOrder, productOrders } from '../order_product.model'

const TEST = new productOrders()

describe('test order-products model methods', () => {
    const test: productOrder = {
        product_id: '1',
        quantity: 12,
        user_id: '3',
    }
    it('index order-products', async () => {
        await TEST.index()
        const result = await TEST.index()

        expect(result.length).toBeGreaterThan(0)
    })

    it('creats order_produt ', async () => {
        const create = await TEST.addProduct(
            test.product_id,
            test.quantity,
            test.user_id
        )
        expect(create.quantity).toEqual(12)
    })

    it('Must have show method', () => {
        expect(TEST.show).toBeDefined()
    })
})
