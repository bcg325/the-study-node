import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Register from "./pages/home/Register";
import Login from "./pages/home/Login";
import Home from "./pages/home/Home";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainApp from "./pages/mainApp/MainApp";
import Notes from "./pages/mainApp/notes/Notes";
import NotePage from "./pages/mainApp/notes/NotePage";
import Tasks from "./pages/mainApp/tasks/Tasks";
import Timer from "./pages/mainApp/timer/Timer";
import LandingPage from "./pages/home/LandingPage";
import TasksAll from "./pages/mainApp/tasks/Tabs/TasksAll";
import TasksToday from "./pages/mainApp/tasks/Tabs/TasksToday";
import TasksTomorrow from "./pages/mainApp/tasks/Tabs/TasksTomorrow";
import TasksUpcoming from "./pages/mainApp/tasks/Tabs/TasksUpcoming";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainApp />
          </ProtectedRoute>
        }
      >
        <Route path="notes" element={<Notes />}>
          <Route path=":noteId" element={<NotePage />} />
        </Route>

        <Route path="tasks" element={<Tasks />}>
          <Route path="all" element={<TasksAll />} />
          <Route path="today" element={<TasksToday />} />
          <Route path="tomorrow" element={<TasksTomorrow />} />
          <Route path="upcoming" element={<TasksUpcoming />} />
          <Route path="*" element={<Navigate to="today" replace />} />
        </Route>
        <Route path="/timer" element={<Timer />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
