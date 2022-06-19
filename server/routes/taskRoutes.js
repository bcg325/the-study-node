const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskGroup,
  setTaskGroup,
} = require("../controllers/taskController");

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.patch("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

router.get("/taskGroup/:group", protect, getTaskGroup);

router.post("/taskGroup/:group", protect, setTaskGroup);

module.exports = router;
