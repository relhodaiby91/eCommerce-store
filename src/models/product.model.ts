import client from '../database'

export type product = {
    id?: number
    name: string
    price: number
}

export class store {
    async index(): Promise<product[]> {
        try {
            const sql = ' SELECT * FROM products '
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`No products found ${error}`)
        }
    }

    async show(id: string): Promise<product> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'

            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`No Such Product ${id}. Error: ${err}`)
        }
    }

    async create(p: product): Promise<product> {
        try {
            const sql =
                'INSERT INTO products ( name ,price) VALUES ($1,$2) RETURNING * '

            const conn = await client.connect()
            const result = await conn.query(sql, [p.name, p.price])
            const productsResult = result.rows[0]
            conn.release()
            return productsResult
        } catch (err) {
            throw new Error(` fix this Error: ${err}`)
        }
    }
}
