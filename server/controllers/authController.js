const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email || !password)) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("An account with this email exists");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler((req, res) => {
  const user = { name: req.user.name, email: req.user.email };
  res.status(200).json(user);
});

const logout = asyncHandler((req, res) => {
  req.logout(function (err) {
    if (err) {
      res.status(400);
      throw new Error("Failed to log out");
    }
    res.status(200).send();
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = {
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

module.exports = {
  register,
  login,
  logout,
  getMe,
};
