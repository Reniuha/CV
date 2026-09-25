const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();

  res.status(201).json(newUser);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.status(200).json(user);
});

module.exports = router;
