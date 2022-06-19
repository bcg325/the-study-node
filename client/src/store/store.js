import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import noteReducer from "../features/noteSlice";
import taskReducer from "../features/taskSlice";
import timerReducer from "../features/timerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
    tasks: taskReducer,
    timer: timerReducer,
  },
});
export default store;
