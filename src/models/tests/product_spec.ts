import { product, store } from '../product.model'

const TEST = new store()

describe('test product model methods', () => {
    const Product: product = {
        name: 'product-test',
        price: 100,
    }
    it('index products', async () => {
        await TEST.create(Product)
        const result = await TEST.index()

        expect(result.length).toBeGreaterThan(0)
    })

    it('Must have create method', async () => {
        const newProduct = await TEST.create(Product)
        expect(newProduct.price).toEqual(100)
    })

    it('Must have show method', () => {
        expect(TEST.show).toBeDefined()
    })
})
