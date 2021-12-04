/*
    Operations for users
*/
const router = require("express").Router();
const { json } = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Schema import
const User = require("../models/user.model");

// Get user (Sign In)
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (!existing)
    return res.status(404).json({ message: "User does not exist" });
  const passwordCheck = await bcrypt.compare(password, existing.password);
  if (!passwordCheck)
    return res.status(400).json({ message: "Incorrect password" });
  const token = jwt.sign({
      email: existing.email,
      id: existing._id,},
    "temp",
    { expiresIn: "1h" }
  );
  res.status(200).json({ cred: existing, token });
});

// create user (sign up)
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });
  const encryptedPassword = await bcrypt.hash(password, 12);
  const cred = await User.create({
    email: email,
    password: encryptedPassword,
    username: username,
  });
  const token = jwt.sign({
      email: cred.email,
      id: cred._id,},
    "temp",
    { expiresIn: "1h" }
  );
  res.status(201).json({ cred, token });
});

module.exports = router;
