# 🛒 Full Stack E-Commerce Web Application

## 📌 Overview

This project is a **full-stack e-commerce web application** built using the **MERN stack (MongoDB, Express, React, Node.js)**.
It allows users to browse products, view detailed information, manage cart, and place orders.
An **admin authentication system** is also included to manage products.

---

## 🚀 Features

### 👤 User Features

* 🔐 Register & Login (JWT Authentication)
* 🛍️ Browse Products
* 📄 View Product Details
* 🛒 Add to Cart
* ➕ Update Quantity
* 💳 Checkout & Place Order
* 🎉 Order Success Page

---

### 🛠️ Admin Features

* 🔑 Admin Login (`isAdmin: true`)
* ➕ Add Products
* ✏️ Update/Delete Products (extendable)
* 📦 Manage inventory

---

## 🧰 Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* dotenv

---

## 📂 Project Structure

```
ecommerce-project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Success.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── index.js
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔽 1. Clone Repository

```bash
git clone https://github.com/your-username/ecommerce-project.git
cd ecommerce-project
```

---

## 🖥️ Backend Setup

### 1. Go to backend folder

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

### 4. Start backend server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 🌐 Frontend Setup

### 1. Go to frontend folder

```bash
cd ../frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start frontend

```bash
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### 🔐 Authentication

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

* **Users**

  * name, email, password, isAdmin

* **Products**

  * name, price, image
  * description, brand, warranty
  * offers, discount

* **Cart**

  * userId, products, quantity

* **Orders**

  * userId, products, totalAmount

---

## 🔄 Application Flow

### User Flow

```
Register/Login → Browse Products → View Details → Add to Cart → Checkout → Place Order
```

### Admin Flow

```
Admin Login → Add Products → Manage Products
```

---

## 🔒 Authentication

* JWT-based authentication
* Token stored in localStorage
* Admin access controlled using:

```js
isAdmin: true
```

---

## ✨ Key Highlights

* Full-stack MERN application
* Authentication (User + Admin)
* REST API architecture
* Cart & Order system
* Clean UI with React

---

## 📈 Future Enhancements

* 💳 Payment Integration (Razorpay / Stripe)
* 📦 Order History Page
* 🔍 Search & Filter Products
* 🧑‍💼 Full Admin Dashboard UI
* ☁️ Image Upload (Cloudinary)

---

## 👩‍💻 Author

**Janani M**

---

## ⭐ Acknowledgement

This project was built as a learning-based full-stack application to understand real-world e-commerce systems.

---

## 📌 One-Line Summary

> Developed a full-stack e-commerce web application with authentication, cart system, and order processing using React, Node.js, Express, and MongoDB.
