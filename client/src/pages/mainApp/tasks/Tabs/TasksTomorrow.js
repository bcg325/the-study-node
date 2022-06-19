import { useOutletContext } from "react-router-dom";
import TaskPage from "./TaskPage";
const TasksTomorrow = () => {
  const [, , tomorrowTasks] = useOutletContext();

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  return <TaskPage tasks={tomorrowTasks} name="tomorrow" date={tomorrow} />;
};
export default TasksTomorrow;
