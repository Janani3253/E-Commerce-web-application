const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// ✅ PRODUCT MANAGEMENT
// Add Product
router.post("/products", adminMiddleware, async (req, res) => {
  try {
    const { name, price, image, description, brand, warranty, offers, discount } = req.body;

    const newProduct = new Product({
      name,
      price,
      image,
      description,
      brand,
      warranty,
      offers,
      discount
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});

// Update Product
router.put("/products/:id", adminMiddleware, async (req, res) => {
  try {
    const { name, price, image, description, brand, warranty, offers, discount } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, description, brand, warranty, offers, discount },
      { new: true }
    );

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

// Delete Product
router.delete("/products/:id", adminMiddleware, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

// Get All Products (for admin dashboard)
router.get("/products", adminMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ total: products.length, products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// ✅ USER MANAGEMENT
// Get All Users
router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ total: users.length, users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Get Single User
router.get("/users/:id", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
});

// Update User (change name, email, admin status)
router.put("/users/:id", adminMiddleware, async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, isAdmin },
      { new: true }
    ).select("-password");

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

// Delete User
router.delete("/users/:id", adminMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

// ✅ ORDER MANAGEMENT
// Get All Orders
router.get("/orders", adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ total: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

// Get Single Order
router.get("/orders/:id", adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});

// Update Order Status
router.put("/orders/:id", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
});

// Delete Order
router.delete("/orders/:id", adminMiddleware, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
});

// ✅ ADMIN DASHBOARD STATS
router.get("/stats/dashboard", adminMiddleware, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      stats: {
        totalProducts,
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
});

module.exports = router;
