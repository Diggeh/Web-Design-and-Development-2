# Final Project – Run Guide

This project has a Node/Express backend (`backend`) and a React + Vite frontend (`frontend`). Follow the steps below to get the website running locally.

## Prerequisites
- Node.js 18+ and npm
- A MongoDB connection string (local or cloud)

## Backend setup (`Final-project/backend`)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with the required secrets:
   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/your-db-name
   JWT_SECRET=replace-with-a-strong-secret
   ```
3. (Optional) Seed sample products once MongoDB is available:
   ```bash
   node seed.js
   ```
4. Start the API server (listens on `http://localhost:3000`):
   ```bash
   npm run dev
   ```

## Frontend setup (`Final-project/frontend`)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite dev server (defaults to `http://localhost:5173`):
   ```bash
   npm run dev
   ```

The frontend expects the backend at `http://localhost:3000` (see `src/services/*`). Run the backend first, then start the frontend in a separate terminal and open the shown Vite URL in your browser.
