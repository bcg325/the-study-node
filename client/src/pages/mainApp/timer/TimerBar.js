import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTimer, endTimer } from "../../../features/timerSlice";

const TimerBar = () => {
  const dispatch = useDispatch();
  const [timerProgress, setTimerProgress] = useState();
  const { remainingTime, settings, currentTimer, showTimerModule, active } =
    useSelector((state) => state.timer);

  useEffect(() => {
    let interval = null;

    if (remainingTime <= 0) {
      clearInterval(interval);
      dispatch(endTimer());
      return;
    }
    interval = setInterval(() => {
      dispatch(updateTimer(remainingTime - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimerModule, remainingTime, dispatch]);

  useEffect(() => {
    const percent = Math.round(
      (remainingTime / (settings[currentTimer] * 60)) * 100
    );

    setTimerProgress(percent);
  }, [remainingTime, currentTimer, settings]);

  if (!showTimerModule || !active) {
    return;
  }

  const barStyles = {
    width: `${timerProgress}%`,
    transition: "width 500ms ease-in-out",
  };

  const barColor =
    currentTimer === "work"
      ? "bg-snRed"
      : currentTimer === "break"
      ? "bg-snBlue"
      : "bg-snGreen";

  return (
    <div className="fixed top-0 right-0 w-screen h-1 z-[42] ">
      <div
        style={barStyles}
        className={"transition ease-in-out h-full rounded-full " + barColor}
      ></div>
    </div>
  );
};
export default TimerBar;
