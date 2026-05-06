# 🔐 Admin Panel - Backend Setup & API Documentation

## Backend Structure

The backend admin functionality is already configured and ready to use!

### Files
- **Admin Routes:** `D:\e-commerce\backend\routes\adminRoutes.js`
- **Admin Middleware:** `D:\e-commerce\backend\middleware\adminMiddleware.js`
- **Auth Routes:** `D:\e-commerce\backend\routes\authRoutes.js` (Updated)

### Models with Admin Support
- **User Model** (`D:\e-commerce\backend\models\User.js`) - Has `isAdmin` field
- **Product Model** (`D:\e-commerce\backend\models\Product.js`) - Manages products
- **Order Model** (`D:\e-commerce\backend\models\Order.js`) - Manages orders with status

---

## Admin Middleware

### Purpose
Protects all admin routes by verifying:
1. Valid JWT token exists
2. Token is not expired
3. User has `isAdmin: true`

### How It Works
```javascript
// File: middleware/adminMiddleware.js
const adminMiddleware = async (req, res, next) => {
  // Check Authorization header for Bearer token
  // Verify JWT signature
  // Fetch user from database
  // Check if user.isAdmin === true
  // If all checks pass, call next()
  // Otherwise return 401 or 403 error
};
```

### Usage in Routes
```javascript
router.post("/products", adminMiddleware, async (req, res) => {
  // This endpoint is now protected!
  // Only admins can add products
});
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api/admin
```

### Authentication
All endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Product Management APIs

### 1. Add Product
```
POST /products
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "iPhone 14",
  "price": 79999,
  "image": "https://...",
  "description": "Latest iPhone model",
  "brand": "Apple",
  "warranty": "1 Year",
  "offers": "Free Screen Protector",
  "discount": "10"
}

Response: 201 Created
{
  "message": "Product added successfully",
  "product": { ... }
}
```

### 2. Get All Products
```
GET /products
Authorization: Bearer <token>

Response: 200 OK
{
  "total": 5,
  "products": [ ... ]
}
```

### 3. Update Product
```
PUT /products/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Updated Name",
  "price": 89999,
  ...
}

Response: 200 OK
{
  "message": "Product updated successfully",
  "product": { ... }
}
```

### 4. Delete Product
```
DELETE /products/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Product deleted successfully",
  "product": { ... }
}
```

---

## Order Management APIs

### 1. Get All Orders
```
GET /orders
Authorization: Bearer <token>

Response: 200 OK
{
  "total": 15,
  "orders": [ ... ]
}
```

### 2. Get Single Order
```
GET /orders/:id
Authorization: Bearer <token>

Response: 200 OK
{ order object }
```

### 3. Update Order Status
```
PUT /orders/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "Shipped"  // Processing, Shipped, Delivered, Cancelled
}

Response: 200 OK
{
  "message": "Order status updated successfully",
  "order": { ... }
}
```

### 4. Delete Order
```
DELETE /orders/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Order deleted successfully",
  "order": { ... }
}
```

---

## User Management APIs

### 1. Get All Users
```
GET /users
Authorization: Bearer <token>

Response: 200 OK
{
  "total": 25,
  "users": [ ... ]
}
```

### 2. Get Single User
```
GET /users/:id
Authorization: Bearer <token>

Response: 200 OK
{ user object (no password) }
```

### 3. Update User
```
PUT /users/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "New Name",
  "email": "newemail@example.com",
  "isAdmin": true
}

Response: 200 OK
{
  "message": "User updated successfully",
  "user": { ... }
}
```

### 4. Delete User
```
DELETE /users/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "User deleted successfully",
  "user": { ... }
}
```

---

## Dashboard Stats API

### Get Dashboard Statistics
```
GET /stats/dashboard
Authorization: Bearer <token>

Response: 200 OK
{
  "stats": {
    "totalProducts": 50,
    "totalUsers": 150,
    "totalOrders": 320,
    "totalRevenue": 2500000
  }
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "No token provided" // OR "Token is not valid"
}
```

### 403 Forbidden
```json
{
  "message": "Admin access required"
}
```

### 400 Bad Request
```json
{
  "message": "Invalid status" // OR other validation errors
}
```

### 404 Not Found
```json
{
  "message": "User not found" // OR "Product not found", etc.
}
```

### 500 Internal Server Error
```json
{
  "message": "Error adding product",
  "error": "Error details..."
}
```

---

## Making Users Admin

### Method 1: Via MongoDB
```javascript
// Connect to MongoDB
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isAdmin: true } }
)
```

### Method 2: Via API (Admin User)
Use the PUT `/admin/users/:id` endpoint:
```javascript
{
  "name": "User Name",
  "email": "user@example.com",
  "isAdmin": true  // Set this to true
}
```

### Method 3: Initial Admin Setup
```javascript
// Add first admin directly to MongoDB
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "password123",
  isAdmin: true,
  createdAt: new Date()
})
```

---

## JWT Token Structure

### Payload (After Login)
```json
{
  "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "John Admin",
  "email": "admin@example.com",
  "isAdmin": true,
  "iat": 1705402200,
  "exp": 1705488600
}
```

### Decoding Token (Frontend)
```javascript
const token = localStorage.getItem("token");
const decoded = JSON.parse(atob(token.split(".")[1]));
console.log(decoded.isAdmin); // true for admins
```

---

## Updated Auth Routes

### Login Endpoint (Updated)
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Admin",
    "email": "admin@example.com",
    "isAdmin": true
  }
}
```

**Changes:**
- Added `isAdmin` to JWT payload
- Returns user object with login response
- Allows frontend to access admin status

---

## Testing the APIs

### Using cURL

#### Test Admin Access
```bash
curl -X GET http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer <token>"
```

#### Add Product
```bash
curl -X POST http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 5000,
    "description": "Test"
  }'
```

#### Update Order Status
```bash
curl -X PUT http://localhost:5000/api/admin/orders/<order_id> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status": "Shipped"}'
```

### Using Postman
1. Create new collection
2. Set Authorization header: `Bearer <token>`
3. Create requests for each endpoint
4. Save collection for reuse

---

## Database Schema

### User Schema (Admin Field)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  isAdmin: Boolean (default: false),  // ← Admin flag
  createdAt: Date (default: now)
}
```

### Product Schema
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  image: String,
  description: String,
  brand: String,
  warranty: String,
  offers: String,
  discount: String
}
```

### Order Schema
```javascript
{
  _id: ObjectId,
  userId: String,
  products: Array,
  totalAmount: Number,
  status: String (default: "Processing"),  // ← Order status
  createdAt: Date (default: now)
}
```

---

## Deployment Notes

### Environment Variables
Create `.env` file in backend root:
```
JWT_SECRET=your_secret_key
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
PORT=5000
```

### Security Best Practices
- ✅ Use strong JWT_SECRET in production
- ✅ Validate all input data
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Add logging for audit trail
- ✅ Use environment variables for secrets

---

## Troubleshooting

### Admin Routes Not Working
1. Verify `adminMiddleware` is properly required
2. Check token format: `Bearer <token>`
3. Verify JWT_SECRET matches both frontend and backend
4. Check user.isAdmin in database

### Users Getting 403 Error
1. Login user is not admin in database
2. Update user: `db.users.updateOne({_id: ObjectId("...")}, {$set: {isAdmin: true}})`
3. Logout and login again

### Products Not Saving
1. Check MongoDB connection
2. Verify required fields are provided
3. Check server logs for errors
4. Ensure product schema has all fields

---

## Version History

- **v1.0** (May 4, 2026)
  - Initial admin panel release
  - Product management
  - Order management
  - User management
  - Admin authentication

---

**Backend Setup Complete!** ✅

All admin endpoints are ready to use with the frontend admin panel.
