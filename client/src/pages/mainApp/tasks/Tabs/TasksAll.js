import { useOutletContext } from "react-router-dom";
import TaskPage from "./TaskPage";
const TasksAll = () => {
  const [allTasks] = useOutletContext();

  return <TaskPage tasks={allTasks} name="all" date={null} />;
};
export default TasksAll;
