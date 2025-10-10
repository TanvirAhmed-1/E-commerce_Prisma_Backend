# Backend_Prisma

This is a backend API for an E-commerce project built using **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**.

## Features

- User management (CRUD)
- Product management (CRUD)
- Category management (CRUD)
- Reviews for products
- Validation using Zod
- Error handling middleware
- Fully typed with TypeScript

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod (validation)
- Nodemon (dev)
- HTTP status codes: http-status

## Setup Instructions

1. Clone the repository:

git clone https://github.com/TanvirAhmed-1/Backend_Prisma.git
cd Backend_Prisma
Install dependencies:

npm install
Create a .env file in the root directory and add your database URL:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
Run Prisma migrations (if needed):

npx prisma migrate dev --name init
Generate Prisma client:

npx prisma generate
Start the server:

npm run dev
The server will run at: http://localhost:5000

API Endpoints

/api/users – CRUD operations for users

/api/products – CRUD operations for products

/api/categorys – CRUD operations for categories

/api/reviews – CRUD operations for reviews

```

```
