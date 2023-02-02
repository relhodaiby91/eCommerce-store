import client from '../database'

export type productOrder = {
    id?: number
    product_id: string
    quantity: number
    user_id: string
}

export class productOrders {
    async index(): Promise<productOrder[]> {
        try {
            const sql = 'select * from order_products'
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`order_product model  ${error}`)
        }
    }

    async show(id: string): Promise<productOrder> {
        try {
            const sql = 'select * from order_products where user_id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async addProduct(
        product_id: string,
        quantity: number,
        user_id: string
    ): Promise<productOrder> {
        try {
            const sql =
                'insert into order_products (product_id , quantity, user_id) values ($1,$2,$3) returning *'
            const conn = await client.connect()
            const result = await conn.query(sql, [
                product_id,
                quantity,
                user_id,
            ])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`this is order_product model error ${error}`)
        }
    }
}
