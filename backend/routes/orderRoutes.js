const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");


// ✅ PLACE ORDER
router.post("/place", async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ userId });

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const total = cart.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = new Order({
    userId,
    products: cart.products,
    totalAmount: total,
    status: "Processing"
  });

  await order.save();

  await Cart.deleteOne({ userId });

  res.json({
    message: "Order placed successfully",
    orderId: order._id   // 🔥 IMPORTANT
  });
});


// ✅ GET USER ORDERS
router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId })
    .sort({ createdAt: -1 });

  res.json(orders);
});


// ✅ UPDATE STATUS (for admin / testing)
router.put("/update/:id", async (req, res) => {
  const { status } = req.body;

  await Order.findByIdAndUpdate(req.params.id, { status });

  res.json({ message: "Status updated" });
});

module.exports = router;