import express from 'express'
import client from './database'
// import bodyParser from "body-parser";
import products_routes from './handlers/product_handler'
import { users_routes } from './handlers/users_handler'
import { orders_routes } from './handlers/order_handler'
import { order_products_routes } from './handlers/order_product_handler'
// import order_Routes from './handlers/orders.handler';
// import dashboardRoutes from './handlers/dashboard_handler';

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

// import bcrypt from "bcrypt";

//@ts-ignores
// const salt = parseInt(process.env.SALT_ROUNDS);

// app.use(bodyParser.json());
app.use(express.json())

// ROUTES
products_routes(app)
users_routes(app)
orders_routes(app)
order_products_routes(app)
// order_Routes(app);
// dashboardRoutes(app);
app.listen(3000, function () {
    // console.log(process.env.host);

    // console.log(client);

    console.log(`starting app on: ${address}`)
    // console.log(process.env.BCRYPT_PASSWORD, process.env.SALT_ROUNDS);
    // const password = "hiiii";
    // const hash = bcrypt.hashSync(password + pepper, salt);
    // console.log(hash);
    // const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
    // console.log(process.env.BCRYPT_PASSWORD);
    // console.log(process.env.SALT_ROUNDS);

    // const password = "yourpassword";
    // const hashed = bcrypt.hashSync(password, 10);

    // console.log(hashed);

    // const compare = bcrypt.compareSync(password, hashed);
    // console.log(compare);
})

export default app
