import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router-dom";
import TimerBar from "./timer/TimerBar";
import { useSelector } from "react-redux";
import { useState } from "react";

const MainApp = () => {
  const [collapse, setCollapse] = useState(false);
  const { showTimerModule, active } = useSelector((state) => state.timer);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="flex bg-snBlack w-full min-h-screen">
      {showTimerModule && active && <TimerBar />}
      <MainNavbar collapse={collapse} toggleCollapse={toggleCollapse} />
      <Outlet context={[collapse, toggleCollapse]} />
    </div>
  );
};
export default MainApp;
