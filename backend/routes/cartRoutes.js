const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// ADD TO CART
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, products: [{ ...product, quantity: 1 }] });
  } else {
    const index = cart.products.findIndex(
      (p) => p.productId === product.productId
    );

    if (index > -1) {
      cart.products[index].quantity += 1;   // 🔥 increase qty
    } else {
      cart.products.push({ ...product, quantity: 1 });
    }
  }

  await cart.save();
  res.json(cart);
});

// GET CART
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart);
});

// REMOVE ITEM
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });

  cart.products = cart.products.filter(p => p.productId !== productId);

  await cart.save();

  res.json(cart);
});

router.post("/update", async (req, res) => {
  const { userId, productId, action } = req.body;

  const cart = await Cart.findOne({ userId });

  const item = cart.products.find(p => p.productId === productId);

  if (action === "inc") item.quantity += 1;
  if (action === "dec") item.quantity -= 1;

  // remove if quantity 0
  cart.products = cart.products.filter(p => p.quantity > 0);

  await cart.save();
  res.json(cart);
});

module.exports = router;