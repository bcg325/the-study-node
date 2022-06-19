import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useMatch } from "react-router-dom";
import TaskSidebar from "./Sidebar/TaskSidebar";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../../features/taskSlice";
import { Outlet } from "react-router-dom";
import Container from "../../../components/utilities/Container";
import selectFilteredTasks from "../../../selectors/selectFilteredTasks";

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapse, toggleCollapse] = useOutletContext();
  const [filteredTasks, setFilteredTasks] = useState(null);
  const mainRoute = useMatch("/tasks");

  const contentStyles =
    " py-3 sm:p-3 mr-10 ml-6 md:mx-20 lg:mx-40 text-white " +
    (collapse
      ? "xl:mx-64  "
      : " md:ml-64 md:mr-8 lg:ml-[19rem] lg:mr-16 xl:ml-[23rem] xl:mr-32");

  useEffect(() => {
    if (mainRoute) {
      navigate("today");
    }
    dispatch(getTasks());
  }, []);

  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    setFilteredTasks(selectFilteredTasks(tasks));
  }, [tasks]);

  if (!filteredTasks) {
    return;
  }

  return (
    <Container>
      <TaskSidebar
        collapse={collapse}
        toggleCollapse={toggleCollapse}
        allCount={Object.keys(filteredTasks.all).length}
        todayCount={Object.keys(filteredTasks.today).length}
        tomorrowCount={Object.keys(filteredTasks.tomorrow).length}
        upcomingCount={Object.keys(filteredTasks.upcoming).length}
      />
      <div className={contentStyles}>
        <Outlet
          context={[
            filteredTasks.all,
            filteredTasks.today,
            filteredTasks.tomorrow,
            filteredTasks.upcoming,
          ]}
        />
      </div>
    </Container>
  );
};

export default Tasks;
