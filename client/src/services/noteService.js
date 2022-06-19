import axios from "axios";

const API_URL = "/notes/";

const getNotes = async () => {
  const res = await axios.get(API_URL, {
    withCredentials: true,
  });

  return res.data;
};
const getNoteData = async (noteId) => {
  const res = await axios.get(API_URL + noteId + "/editorData", {
    withCredentials: true,
  });

  return res.data;
};

const createNote = async (noteData) => {
  const res = await axios.post(API_URL, noteData, {
    withCredentials: true,
  });

  return res.data;
};

const updateNote = async (noteId, noteData) => {
  const res = await axios.patch(API_URL + noteId, noteData, {
    withCredentials: true,
  });

  return res.data;
};

const deleteNote = async (noteId) => {
  const res = await axios.delete(API_URL + noteId, {
    withCredentials: true,
  });

  return res.data;
};

const noteService = {
  getNotes,
  getNoteData,
  createNote,
  updateNote,
  deleteNote,
};

export default noteService;
