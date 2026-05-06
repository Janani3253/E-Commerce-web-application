const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });
  await user.save();

  res.json({ message: "User registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isAdmin = user.isAdmin === true || user.role === "admin";

  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin
    },
    process.env.JWT_SECRET || "secretkey"
  );

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin
    }
  });
});

module.exports = router;
