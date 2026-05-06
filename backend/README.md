# 🛒 E-Commerce Backend (Node.js + Express + MongoDB)

## 📌 Overview

This is the backend of a full-stack e-commerce application built using **Node.js, Express, and MongoDB**.
It provides APIs for authentication, products, cart, and order management.

---

## 🚀 Features

* 🔐 User Authentication (JWT)
* 🛍️ Product Management
* 🛒 Cart API
* 📦 Order Placement
* 🛠️ Admin Support (isAdmin)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (Authentication)
* dotenv

---

## 📂 Project Structure

backend/
│── models/
│   └── User.js
│   └── Product.js
│   └── Cart.js
│   └── Order.js
│
│── routes/
│   └── authRoutes.js
│   └── productRoutes.js
│   └── cartRoutes.js
│   └── orderRoutes.js
│
│── index.js
│── .env

---

## ⚙️ Installation & Setup

### 1. Navigate to backend

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_secret_key
```

### 4. Start server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## 🔑 API Endpoints

### 🔐 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### 🛍️ Products

* GET `/api/products`
* GET `/api/products/:id`
* POST `/api/products` (Admin)

### 🛒 Cart

* POST `/api/cart/add`
* GET `/api/cart/:userId`

### 📦 Orders

* POST `/api/orders/place`

---

## 🗄️ Database Collections

* Users
* Products
* Cart
* Orders

---

## 🔒 Admin Authentication

* Admin user has:

```js
isAdmin: true
```

* Used to:

  * Add products
  * Manage system

---

## 🧠 Key Concepts Used

* REST API Design
* JWT Authentication
* MongoDB CRUD operations
* Middleware usage

---

## ✨ Future Improvements

* Payment Gateway Integration
* Order Tracking System
* Role-based Authorization Middleware
* Image Upload (Cloudinary)

---

