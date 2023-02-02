# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  ---HTTP verb: GET
  --- Endpoint: /products

- Show
  ---HTTP verb: GET
  --- Endpoint: /productID
  --- request query: /products?id=2

- Create [token required]
  ---HTTP verb: POST
  --- Endpoint: /newproduct
  --- request body:
  --- post the token generated when creating user in authorization headers
  {
  "name": "productname",
  "price": 124
  }

#### Users

- Index [token required]
  --- HTTP verb: GET
  --- EndPoint: /users

- Show [token required]
  ---HTTP verb: GET
  --- Endpoint: /user
  --- request query: users?id=2

- Create N[token required]
  ---HTTP verb: POST
  ---EndPoint: /newuser
  ---request body :
  {
  "firstname": "user-first-name" ,
  "lastname": " user-lastname" ,
  "password": " insert-password"
  }

- Authenticate // token not required
  ---HTTP verb: POST
  --- EndPoint: /sign-in
  ---request body :
  {
  "firstname": "user-firstname",
  "password": "insert-password"
  }

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

- Show orders by User
  ---HTTP verb: GET
  --- Endpoint: /ordered
  --- post token in authorization headers

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Schema

### Products

create table products ( id serial primary key , name varchar(30) not null, price integer not null );

### USERS

CREATE TABLE users (id SERIAL PRIMARY KEY, firstname VARCHAR(50) not null,lastname VARCHAR(50) not null ,password_digest VARCHAR not null
);

### ORDERS

create table orders (id serial primary key , status text , user_id int references users(id));

### order_product

create table order_product (id serial primary key , product_id int references products(id) , quantity integer , user_id int references users(id) );
