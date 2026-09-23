# 🛍️ Like N Like - Clothing & Fashion E-Commerce Platform

A modern, full-stack clothing and fashion e-commerce platform built with React, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

---

## 🌟 Features

### 🛍️ Customer Experience
- **Hero & Promotional Banners**: Engaging hero sections, sales strips, and category highlights.
- **Category Shopping**: Men, Women, Kids collections with category-level filtering.
- **Product Details & Cards**: High-res product cards with discounts, MRP strike-throughs, size pickers, and wishlist buttons.
- **Recent Hits**: Trending and hot arrivals showcase.

### 🔐 Authentication & Roles
- **Role-Based Access Control**: Separate user and admin roles.
- **JWT Authentication**: Secure login, registration, and persistent sessions.
- **Protected Routes**: Client-side route guards for user and admin-only pages.

### ⚙️ Admin Capabilities
- **Admin Dashboard**: Overview of products, categories, stock, and management links.
- **Add Product Portal**: Interactive form to add new products with images, categories, sizes, prices, stock, and descriptions.
- **Product Management**: Quick delete and inventory controls.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v3, React Router v7, Axios, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcryptjs, CORS

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/RAKESH-KUMAR-N3/like-n-like.git
cd like-n-like
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` based on `.env.example`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```
Start backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file inside `frontend/` based on `.env.example`:
```env
VITE_API_URL=http://localhost:5000/api
```
Start frontend server:
```bash
npm run dev
# Frontend will run on http://localhost:5173
```
