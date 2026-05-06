# ⚡ Admin Panel - Quick Setup Guide

## 🎯 What's Included

A complete admin panel with:
- ✅ Product Management (Add, Edit, Delete)
- ✅ Order Management (View, Update Status)
- ✅ User Management (View, Edit, Delete)
- ✅ Admin Dashboard with Statistics
- ✅ Role-Based Access Control
- ✅ Beautiful Responsive UI

---

## 📋 Prerequisites

### Backend Running
```bash
cd D:\e-commerce\backend
npm install
npm run dev
# Server should be running on http://localhost:5000
```

### Frontend Ready
```bash
cd d:\e-commerce\frontend
npm install
npm run dev
# Frontend should be running on http://localhost:5173 (or similar)
```

---

## 🚀 Quick Start

### Step 1: Create an Admin User

#### Option A: MongoDB Shell
```javascript
use ecommerce

// Insert admin user
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  isAdmin: true,
  createdAt: new Date()
})
```

#### Option B: Via existing user (if you have users in DB)
```javascript
db.users.updateOne(
  { email: "youruser@example.com" },
  { $set: { isAdmin: true } }
)
```

### Step 2: Login with Admin Account
1. Go to `http://localhost:5173/login`
2. Enter admin email and password
3. Click Login

### Step 3: Access Admin Panel
- After login, you'll see **🔐 Admin** link in navbar
- Click it to access the admin panel
- Or navigate directly to `http://localhost:5173/admin`

---

## 🎮 Features Walkthrough

### 📦 Product Management
**Tab:** Admin → Products

**Add Product:**
1. Click "➕ Add Product"
2. Fill in product details:
   - Name, Price, Image URL
   - Brand, Warranty, Offers, Discount
3. Click "Add Product"

**Edit Product:**
1. Click "✏️ Edit" on any product card
2. Modify details
3. Click "Update Product"

**Delete Product:**
1. Click "🗑️ Delete" on product
2. Confirm deletion

### 📋 Order Management
**Tab:** Admin → Orders

**View Orders:**
- See all orders with:
  - Order ID, User ID
  - Total Amount
  - Current Status
  - Created Date

**Update Order Status:**
1. Click "▶ Details" on any order
2. See full order details
3. Click new status button (Processing, Shipped, Delivered, Cancelled)
4. Status updates instantly

### 👥 User Management
**Tab:** Admin → Users

**View Users:**
- See all registered users
- Check if they're Admin or Regular User
- See when they joined

**Edit User:**
1. Click "✏️ Edit" on any user
2. Modify name, email, or admin status
3. Click "✓ Save"

**Delete User:**
1. Click "🗑️ Delete"
2. Confirm deletion

### 📊 Dashboard
**Tab:** Admin → Dashboard (Default)

**See Statistics:**
- Total Products
- Total Orders
- Total Users

---

## 📂 Frontend Files Created

```
d:\e-commerce\frontend\
├── src/
│   ├── pages/
│   │   ├── AdminPanel.jsx          # Main admin page
│   │   └── AdminPanel.css
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminProductManager.jsx
│   │   │   ├── AdminProductManager.css
│   │   │   ├── AdminOrderManager.jsx
│   │   │   ├── AdminOrderManager.css
│   │   │   ├── AdminUserManager.jsx
│   │   │   └── AdminUserManager.css
│   │   └── Navbar.jsx              # Updated
│   └── App.jsx                     # Updated
└── ADMIN_PANEL_README.md          # Full documentation
```

---

## 🔧 Backend Updates

### Files Updated

**1. Auth Routes** (`D:\e-commerce\backend\routes\authRoutes.js`)
```javascript
// Now returns user object with login
// Includes isAdmin flag in JWT token
```

**2. Existing Endpoints Ready**
- Admin Routes: Already configured ✅
- Admin Middleware: Already configured ✅
- Database Models: Already have isAdmin field ✅

---

## 🔐 How Authentication Works

### Login Flow
```
1. User enters email & password
   ↓
2. Backend validates credentials
   ↓
3. Generates JWT token (includes isAdmin flag)
   ↓
4. Returns token + user data
   ↓
5. Frontend stores token in localStorage
   ↓
6. Frontend stores user data (with isAdmin)
   ↓
7. Navbar shows "🔐 Admin" link if isAdmin = true
```

### Admin Panel Access
```
1. User clicks "🔐 Admin" link
   ↓
2. Navigates to /admin
   ↓
3. AdminPanel component checks:
   - Is user logged in? (token exists)
   - Is user admin? (user.isAdmin = true)
   ↓
4. If both true → Show admin panel
   If not → Show error & redirect
```

---

## 🧪 Test Scenarios

### Test 1: Add a Product
```
1. Login as admin
2. Go to Admin → Products
3. Click "➕ Add Product"
4. Enter: name="Test Phone", price=50000
5. Click "Add Product"
✅ Expect: Product appears in list
```

### Test 2: Update Order Status
```
1. Go to Admin → Orders
2. Click "▶ Details" on first order
3. Click "Shipped" button
✅ Expect: Status changes to Shipped (blue)
```

### Test 3: Edit User to Admin
```
1. Go to Admin → Users
2. Click "✏️ Edit" on any user
3. Select "Admin" in status dropdown
4. Click "✓ Save"
✅ Expect: User now shows "👑 Admin" badge
```

---

## 🐛 Troubleshooting

### "Admin access required" error
**Problem:** Login shows error when accessing admin panel
**Solution:**
1. Check if user has `isAdmin: true` in database
2. Logout and login again
3. Verify JWT token in browser console:
   ```javascript
   const token = localStorage.getItem("token");
   const decoded = JSON.parse(atob(token.split(".")[1]));
   console.log(decoded); // Check isAdmin field
   ```

### Admin link not showing in navbar
**Problem:** Can't see "🔐 Admin" link after login
**Solution:**
1. Verify user in database: `db.users.find({email: "your_email"})`
2. Check user has `isAdmin: true`
3. Update if needed: `db.users.updateOne({email: "..."}, {$set: {isAdmin: true}})`
4. Clear localStorage and login again:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

### API returns 401 errors
**Problem:** Admin endpoints return "No token provided"
**Solution:**
1. Verify token is stored: `localStorage.getItem("token")`
2. Check token format in network request
3. Token should be: `Authorization: Bearer <token>`
4. Logout and login again if token expired

### MongoDB connection failed
**Problem:** Can't fetch data from admin panel
**Solution:**
1. Check MongoDB is running
2. Verify connection string in backend `.env`
3. Check if database exists: `mongosh` then `show databases`
4. Restart backend: `npm run dev`

---

## 📊 Sample Test Data

### Sample Admin Account
```
Email: admin@example.com
Password: admin123
```

### Sample Products to Create
1. iPhone 14 - ₹79,999
2. Samsung S23 - ₹69,999
3. OnePlus 11 - ₹59,999

### Sample Order Status Flow
- Create order on storefront
- Go to Admin → Orders
- Change status: Processing → Shipped → Delivered

---

## 📚 Documentation Files

### Frontend Documentation
📄 `d:\e-commerce\frontend\ADMIN_PANEL_README.md`
- Complete feature breakdown
- API endpoint details
- File structure
- Testing scenarios

### Backend Documentation
📄 `D:\e-commerce\backend\ADMIN_API_DOCUMENTATION.md`
- Backend setup
- API endpoints with examples
- Error handling
- Deployment notes

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected and running
- [ ] Admin user created in database
- [ ] Can login with admin credentials
- [ ] "🔐 Admin" link visible in navbar
- [ ] Can access /admin page
- [ ] Can view dashboard with stats
- [ ] Can add/edit/delete products
- [ ] Can view and update orders
- [ ] Can manage users
- [ ] All features working without errors

---

## 🎓 Key Concepts

### Admin Middleware
Protects admin endpoints by checking:
- Valid JWT token ✅
- User has isAdmin = true ✅

### Role-Based Access Control
- Regular users → See storefront only
- Admin users → See storefront + admin panel

### Protected Routes
- `/admin` → Admin only
- `/api/admin/*` → Admin only
- Other routes → Public or authenticated users

---

## 📞 Need Help?

1. Check error messages in browser console (F12)
2. Check backend console for errors
3. Verify database connection
4. Review documentation files
5. Check JWT token validity
6. Ensure MongoDB has proper data

---

## 🎉 You're All Set!

The admin panel is now fully functional and ready to use!

**Start managing your e-commerce store like a pro!** 👑

---

**Version:** 1.0
**Last Updated:** May 4, 2026
