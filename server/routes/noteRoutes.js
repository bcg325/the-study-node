const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getNotes,
  getNoteData,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.get("/", protect, getNotes);

router.get("/:id/editorData", protect, getNoteData);

router.post("/", protect, createNote);

router.patch("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);

module.exports = router;
