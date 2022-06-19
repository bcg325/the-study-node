import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../services/taskService";

const initialState = {
  tasks: [],
  taskGroups: {},
  currentTask: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getTaskGroup = createAsyncThunk(
  "task/getGroup",
  async (groupName, thunkAPI) => {
    try {
      return await taskService.getTaskGroup(groupName);
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

export const setTaskGroup = createAsyncThunk(
  "task/setTaskGroup",
  async ({ groupName, taskIds }, thunkAPI) => {
    try {
      await taskService.setTaskGroup(groupName, taskIds);
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

export const getTasks = createAsyncThunk("task/getAll", async (_, thunkAPI) => {
  try {
    return await taskService.getTasks();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, thunkAPI) => {
    try {
      return await taskService.createTask(taskData);
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

export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, taskData }, thunkAPI) => {
    try {
      return await taskService.updateTask(id, taskData);
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

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id, thunkAPI) => {
    try {
      return await taskService.deleteTask(id);
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

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetCurrentTask: (state) => {
      state.currentTask = null;
    },
    updateTaskGroup: (state, action) => {
      if (action.payload.groupName && action.payload.taskIds) {
        state.taskGroups[action.payload.groupName] = action.payload.taskIds;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.tasks = action.payload.tasks;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedTask = action.payload.updatedTask;
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTaskGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.groupName && action.payload.tasks) {
          state.taskGroups[action.payload.groupName] = action.payload.tasks;
        }
      })
      .addCase(getTaskGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetCurrentTask, setFilteredTasks, updateTaskGroup } =
  taskSlice.actions;
export default taskSlice.reducer;
