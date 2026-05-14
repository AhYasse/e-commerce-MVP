 # e-commerce-mvp

A minimal full-stack e-commerce MVP repository with a Node.js/Express backend, MongoDB models for products, users, and carts, and a placeholder frontend folder structure.

## Project Overview

This repository is structured for an e-commerce MVP with:
- `server/`: backend API using Express, Mongoose, JWT-ready auth helpers, and product/user/cart models
- `client/`: front-end scaffolding for a React-style app structure
- `shared/`: common utilities or shared code

## Features

### Backend
- Express server with CORS and JSON body parsing
- MongoDB connection via Mongoose
- `Product` model with category, price, stock, rating, and image fields
- `User` model with hashed password support and role-based field setup
- `Cart` model with calculated total price and cart-item relation to products
- Seed script to populate sample products and an admin user
- Health check endpoint: `/api/health`

### Front End
- Skeleton folder layout under `client/src/`
- No production frontend dependencies or pages are implemented yet

## Repository Structure

- `client/`
	- `package.json`
	- `public/`
	- `src/`
		- `components/`
		- `pages/`
		- `services/`
		- `styles/`
- `server/`
	- `index.js`
	- `seed.js`
	- `controllers/`
	- `middleware/`
	- `models/`
	- `routes/`
	- `utils/`
- `shared/`

## Getting Started

### Backend Setup

1. Install dependencies

```bash
cd server
npm install
```

2. Create a `.env` file in `server/` with the following values:

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
```

3. Start the server:

```bash
npm run dev
```

4. Verify the server is running:

```bash
curl http://localhost:5000/api/health
```

### Seed the Database

To load sample products and create an admin user:

```bash
cd server
npm run seed
```

Default admin credentials:
- Email: `admin@example.com`
- Password: `admin123`

### Client Setup

The client directory is a placeholder structure at this time. If you add a React app or other frontend framework, install dependencies there and create your entrypoint.

## Notes

- `server/index.js` currently contains a health check route and connects to MongoDB.
- API route imports for products, users, and carts are currently commented out and can be enabled once those routes are implemented.
- The `seed.js` script uses `amazon_clone` as the default MongoDB database name if no `MONGODB_URI` is provided.

## Next Steps

- Implement backend route files under `server/routes/`
- Add frontend app code to `client/src/`
- Add authentication, product listing, cart management, and checkout flows

## Contact

For questions, run the server locally and inspect the backend models and seed data to continue development.
