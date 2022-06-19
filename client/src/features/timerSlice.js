import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import timerService from "../services/timerService";
import { Howl } from "howler";
import alarm from "../assets/audio/alarm.wav";

const defaultSettings = {
  work: 25,
  break: 5,
  longBreak: 15,
  longBreakInterval: 4,
  autoContinue: false,
  alarm: true,
};
const initialState = {
  settings: null,
  currentTimer: "work",
  active: false,
  remainingTime: 0,
  pomodoros: 1,
  showTimerModule: false,
  isLoading: false,
  isError: false,
  isSuccess: true,
};

const alarmSound = new Howl({
  src: [alarm],
  volume: 0.15,
});
alarmSound.mute(true);
alarmSound.play();

export const getTimerSettings = createAsyncThunk(
  "timer/getSettings",
  async (_, thunkAPI) => {
    try {
      return await timerService.getSettings();
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

export const setTimerSettings = createAsyncThunk(
  "timer/setSettings",
  async (timerSettings, thunkAPI) => {
    try {
      return await timerService.setSettings(timerSettings);
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

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.settings = action.payload;
    },
    startTimer: (state, action) => {
      state.active = true;
    },
    pauseTimer: (state) => {
      state.active = false;
    },
    changeTimer: (state, action) => {
      state.remainingTime = 0;
      state.currentTimer = action.payload;
    },
    updateTimer: (state, action) => {
      state.remainingTime = action.payload;
    },
    setModule: (state, action) => {
      state.showTimerModule = action.payload;
    },
    endTimer: (state) => {
      if (state.settings.alarm) {
        alarmSound.mute(false);
        alarmSound.play();
      }
      if (state.settings.autoContinue) {
        state.active = true;
      } else {
        state.active = false;
      }

      state.remainingTime = 0;

      switch (state.currentTimer) {
        case "work":
          state.pomodoros += 1;
          state.currentTimer =
            state.settings.longBreak > 0 &&
            (state.pomodoros - 1) % state.settings.longBreakInterval === 0
              ? "longBreak"
              : state.settings.break > 0
              ? "break"
              : "work";
          break;
        case "break":
          state.currentTimer = "work";
          break;
        case "longBreak":
          state.currentTimer = "work";
          break;
        default:
          break;
      }

      if (state.showTimerModule && state.settings.autoContinue) {
        state.remainingTime = state.settings[state.currentTimer] * 60;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimerSettings.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTimerSettings.fulfilled, (state, action) => {
        if (action.payload.timerSettings) {
          const timerSettings = JSON.parse(action.payload.timerSettings);
          state.settings = timerSettings;
        } else {
          state.settings = defaultSettings;
        }
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getTimerSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.settings = defaultSettings;
      })
      .addCase(setTimerSettings.fulfilled, (state, action) => {
        if (action.payload.timerSettings) {
          state.settings = action.payload.timerSettings;
        }
      });
  },
});

export const {
  setTimer,
  startTimer,
  pauseTimer,
  updateTimer,
  endTimer,
  changeTimer,
  setModule,
} = timerSlice.actions;
export default timerSlice.reducer;
