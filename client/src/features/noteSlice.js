import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../services/noteService";

const initialState = {
  notes: [],
  currentNote: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getNotes = createAsyncThunk("note/getAll", async (_, thunkAPI) => {
  try {
    return await noteService.getNotes();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getNoteData = createAsyncThunk(
  "note/getNoteData",
  async (id, thunkAPI) => {
    try {
      return await noteService.getNoteData(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNote = createAsyncThunk(
  "note/create",
  async (noteData, thunkAPI) => {
    try {
      return await noteService.createNote(noteData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "note/update",
  async ({ id, noteData }, thunkAPI) => {
    try {
      return await noteService.updateNote(id, noteData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/delete",
  async (id, thunkAPI) => {
    try {
      return await noteService.deleteNote(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetCurrentNote: (state) => {
      state.currentNote = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.notes = action.payload.notes;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedNote = action.payload.updatedNote;
        state.notes = state.notes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        );
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = state.notes.filter(
          (note) => note.id !== action.payload.id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNoteData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNoteData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentNote = action.payload.note;
      })
      .addCase(getNoteData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetCurrentNote } = noteSlice.actions;
export default noteSlice.reducer;
