# NestJS API with Prisma ORM and MS SQL Server

This project is a NestJS API that uses Prisma ORM to interact with a MS SQL Server database.

## Prerequisites

- Node.js (v14 or later)
- MS SQL Server
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database connection in the `.env` file:
   ```
   DATABASE_URL="sqlserver://localhost:1433;database=barrel;user=sa;password=YourStrong@Passw0rd;trustServerCertificate=true"
   ```
   Replace the values with your actual database connection details.

## Prisma Commands

- Generate Prisma Client:
  ```bash
  npm run prisma:generate
  ```

- Open Prisma Studio (database visualization tool):
  ```bash
  npm run prisma:studio
  ```

- Create and apply migrations:
  ```bash
  npm run prisma:migrate
  ```

## Running the Application

- Development mode:
  ```bash
  npm run start:dev
  ```

- Production mode:
  ```bash
  npm run build
  npm run start:prod
  ```

## API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get a product by ID
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Categories

- `GET /categories` - Get all categories
- `GET /categories/:id` - Get a category by ID
- `POST /categories` - Create a new category
- `PUT /categories/:id` - Update a category
- `DELETE /categories/:id` - Delete a category

## Project Structure

- `src/prisma/` - Prisma service and module
- `src/products/` - Product and Category controllers
- `prisma/schema.prisma` - Prisma schema file with database models