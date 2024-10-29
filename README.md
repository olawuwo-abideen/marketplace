Backend to a Dating App 

Installation

- clone the repository


`git clone git@github.com:olawuwo-abideen/datingapp.git`


- navigate to the folder


`cd datingapp-main.git`

To run the app in development mode

Open a terminal and enter the following command to install all the  modules needed to run the app:

`npm install`


Create a `.env` file with

`DB_HOST=localhost`

`DB_PORT=3306`

`DB_USERNAME=root`

`DB_PASSWORD=password`

`DB_NAME=datingapp`

`PORT=3000`

`JWT_SECRET=secret`

`JWT_EXPIRATION_TIME=216000`

`JWT_RESET_PASSWORD_EXPIRATION_TIME=30000`


Enter the following `npm start` command to Command Line Interface to Start the app

This will start the app and set it up to listen for incoming connections on port 3000. 

Use Postman to test the endpoint


API Endpoints


Auth Management

- **POST /auth/signup**: Register a new user.

- **POST /auth/login**: User login.

User Management

- **GET /profile**: Get user profile details.

- **PUT /profile**: Update user profile

Product Management

- **POST /products**: List a new product (seller only).

- **GET /products**: Retrieve a list of products.

- **GET /products/{id}**: Retrieve a single product by ID.

- **PUT /products/{id}**: Update a product by ID (seller only).

- **DELETE /products/{id}**: Delete a product by ID (seller only).

Order Management

- **POST /purchase**: Purchase a product.

- **GET /orders**: Retrieve order history.

- **GET /orders/{id}**: Track order status.

Reviews and Ratings

- **POST /reviews**: Add a review for a product.

- **PUT /reviews/{id}**: Edit a review.

- **DELETE /reviews/{id}**: Delete a review.

Administrator Management

- **GET /users**: Retrieve a list of users (admin only).

- **PUT /users/{id}**: Update user details (admin only).

- **DELETE /users/{id}**: Delete a user account (admin only).