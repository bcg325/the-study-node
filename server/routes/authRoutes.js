const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const passport = require("passport");
require("dotenv").config();

const {
  register,
  login,
  logout,
  getMe,
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", passport.authenticate("local"), login);

router.post("/logout", logout);

router.get("/me", protect, getMe);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL + "notes",
    failureRedirect: process.env.CLIENT_URL + "login",
  })
);

module.exports = router;
