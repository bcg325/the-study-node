import TaskTab from "./TaskTab";
import { WiDaySunny } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { BsCalendarEvent } from "react-icons/bs";
import { BsListTask } from "react-icons/bs";
import Sidebar from "../../../../components/utilities/Sidebar";
import useScreenWidth from "../../../../hooks/useScreenWidth";

const TaskSidebar = ({
  collapse,
  toggleCollapse,
  allCount,
  todayCount,
  tomorrowCount,
  upcomingCount,
}) => {
  const sidebarStyles =
    " w-60 text-white bg-snGray fixed h-full flex flex-col justify-start align-center items-center";

  const screenWidth = useScreenWidth();

  const altToggleCollapse = () => {
    if (screenWidth < 625) {
      toggleCollapse();
    }
  };

  return (
    <Sidebar
      className={sidebarStyles}
      toggleSidebar={toggleCollapse}
      collapse={collapse}
    >
      <div className="w-full mt-10">
        <TaskTab
          onClick={altToggleCollapse}
          borderColor="border-white"
          icon={<BsListTask className="text-white mx-1.5" />}
          route="all"
        >
          All Tasks
          <span className="font-light absolute right-4">
            {allCount > 0 && allCount}
          </span>
        </TaskTab>
        <TaskTab
          onClick={altToggleCollapse}
          borderColor="border-snGreen"
          icon={<WiDaySunny className="text-snGreen pt-1" size={28} />}
          route="today"
        >
          Today
          <span className="font-light absolute right-4">
            {todayCount > 0 && todayCount}
          </span>
        </TaskTab>
        <TaskTab
          onClick={altToggleCollapse}
          borderColor="border-snPurple"
          icon={<WiSunset className="text-snPurple pt-1" size={28} />}
          route="tomorrow"
        >
          Tomorrow
          <span className="font-light absolute right-4">
            {tomorrowCount > 0 && tomorrowCount}
          </span>
        </TaskTab>
        <TaskTab
          onClick={altToggleCollapse}
          borderColor="border-snOrange"
          icon={
            <BsCalendarEvent className="text-snOrange ml-1.5 mr-2" size={15} />
          }
          route="upcoming"
        >
          Upcoming
          <span className="font-light absolute right-4">
            {upcomingCount > 0 && upcomingCount}
          </span>
        </TaskTab>
      </div>
    </Sidebar>
  );
};
export default TaskSidebar;
