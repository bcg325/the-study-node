import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";
import { updateTimer } from "../../../features/timerSlice";
const TimerCircle = ({ children, active, onEnd }) => {
  const dispatch = useDispatch();
  const { settings, currentTimer, remainingTime, pomodoros } = useSelector(
    (state) => state.timer
  );

  const color =
    currentTimer === "work"
      ? "#C03240"
      : currentTimer === "break"
      ? "#4D87Bf"
      : "#33AF09";

  return (
    <CountdownCircleTimer
      key={currentTimer + pomodoros}
      initialRemainingTime={remainingTime || null}
      isPlaying={active}
      duration={settings[currentTimer] * 60}
      colors={color}
      strokeWidth={7}
      size={225}
      trailColor="#1F1F25"
      onUpdate={(remainingTime) => {
        dispatch(updateTimer(remainingTime));
      }}
      onComplete={() => {
        onEnd();
      }}
    >
      {children}
    </CountdownCircleTimer>
  );
};
export default TimerCircle;
