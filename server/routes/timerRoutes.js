const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getTimerSettings,
  setTimerSettings,
} = require("../controllers/timerController");

router.get("/settings", protect, getTimerSettings);
router.post("/settings", protect, setTimerSettings);

module.exports = router;
