import client, { BCRYPT_PASSWORD, SALT_ROUNDS } from '../database'
import bcrypt from 'bcrypt'

export type user = {
    id?: number
    firstname: string
    lastname?: string
    password: any
}

export class userStore {
    async index(): Promise<user[]> {
        try {
            const sql = 'select * from users'
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(` user.model index function ${error}`)
        }
    }

    async show(id: number): Promise<user[]> {
        try {
            const sql = 'select * from users where id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`go to user.model fix this show func ${error}`)
        }
    }

    async create(u: user): Promise<user[]> {
        try {
            const conn = await client.connect()
            const sql =
                'insert into users (firstname ,lastname, password_digest) values ($1,$2,$3) returning * '
            const hash = bcrypt.hashSync(
                u.password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS!)
            )
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                hash,
            ])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`can not create this user: ${error}`)
        }
    }

    async authenticate(
        firstname: string,
        password: string
    ): Promise<user | null> {
        try {
            const conn = await client.connect()
            const sql = 'select password_digest from users where firstname=($1)'
            const result = await conn.query(sql, [firstname])
            if (result.rows.length) {
                console.log(result.rows.length)
                const user = result.rows[0]
                if (
                    bcrypt.compareSync(
                        password + BCRYPT_PASSWORD,
                        user.password_digest
                    )
                ) {
                    return user
                }
            }
            conn.release()

            return null
        } catch (error) {
            throw new Error(` ${error}`)
        }
    }
}
