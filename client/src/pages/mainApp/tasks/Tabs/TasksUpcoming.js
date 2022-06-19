import { useOutletContext } from "react-router-dom";
import TaskPage from "./TaskPage";
const TasksUpcoming = () => {
  const [, , , upcomingTasks] = useOutletContext();

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  return <TaskPage tasks={upcomingTasks} name="upcoming" date={null} />;
};
export default TasksUpcoming;
