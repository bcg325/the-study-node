import { useOutletContext } from "react-router-dom";
import TaskPage from "./TaskPage";
const TasksToday = () => {
  const [, todayTasks] = useOutletContext();

  const today = new Date();

  return <TaskPage tasks={todayTasks} name="today" date={today} />;
};
export default TasksToday;
