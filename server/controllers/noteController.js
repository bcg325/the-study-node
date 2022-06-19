const mongoose = require("mongoose");
const Note = mongoose.model("Note");

const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).select("-editorContent");
  res.status(200).json({ notes });
};

const getNoteData = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).select(
      "-plainContent -createdAt -updatedAt"
    );
    if (!note) {
      res.status(400);
      throw new Error("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User unauthorized");
    }
    res.status(200).json({ note });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const createNote = async (req, res) => {
  const { title, editorContent, plainContent } = req.body;

  const newNote = await Note.create({
    title,
    editorContent,
    plainContent,
    user: req.user.id,
  });

  if (newNote) {
    res.status(200).json(newNote);
  } else {
    res.status(400);
    throw new Error("Failed to create note");
  }
};

const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User unauthorized");
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updatedNote) {
    res.status(200).json({ updatedNote });
  } else {
    res.status(400);
    throw new Error("Failed to update note");
  }
};

const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User unauthorized");
  }

  await note.remove();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getNotes,
  getNoteData,
  createNote,
  updateNote,
  deleteNote,
};
