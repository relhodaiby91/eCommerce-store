import client from '../database'

// const status = 'active';
export type order = {
    id?: number
    status: string
    user_id: string
}

export class orders {
    async index(): Promise<order[]> {
        try {
            const sql = ' SELECT * FROM orders '
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(` ${error}`)
        }
    }

    async show(id: string): Promise<order> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'

            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(` Error: ${err}`)
        }
    }

    async create(Order: order): Promise<order> {
        try {
            const sql =
                'insert into orders (status, user_id) values ($1,$2) RETURNING*'
            const conn = await client.connect()
            const result = await conn.query(sql, [Order.status, Order.user_id])
            const created = result.rows[0]
            conn.release()
            return created
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
}
