import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
export const {
    HOST_DB,
    NAME_DB,
    USER_DB,
    PASSWORD_DB,
    TEST_DB,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    ENV,
} = process.env

const client = new Pool({
    host: HOST_DB,
    database: ENV === 'dev' ? NAME_DB : TEST_DB,
    user: USER_DB,
    password: PASSWORD_DB,
})

export default client
