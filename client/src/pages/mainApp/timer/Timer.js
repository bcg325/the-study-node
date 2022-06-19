import { useEffect, useState } from "react";
import Container from "../../../components/utilities/Container";
import TimerSettings from "./TimerSettings";
import TimerCircle from "./TimerCircle";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/utilities/Button";
import { BsSkipEndFill } from "react-icons/bs";
import { usePageVisibility } from "react-page-visibility";

import {
  startTimer,
  pauseTimer,
  endTimer,
  changeTimer,
  setModule,
  getTimerSettings,
} from "../../../features/timerSlice";

const Timer = () => {
  const pageVisible = usePageVisibility();
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);

  const { settings, currentTimer, active, pomodoros } = useSelector(
    (state) => state.timer
  );

  useEffect(() => {
    dispatch(setModule(false));
    dispatch(getTimerSettings());

    return () => {
      dispatch(setModule(true));
    };
  }, []);

  useEffect(() => {
    if (!pageVisible) {
      dispatch(setModule(true));
    } else {
      dispatch(setModule(false));
    }
  }, [pageVisible, active, dispatch]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleStart = () => {
    if (active) {
      dispatch(pauseTimer());
    } else {
      dispatch(startTimer());
    }
  };

  const changeCurrentTimer = (newTimer) => {
    dispatch(pauseTimer());
    dispatch(changeTimer(newTimer));
  };

  const onEnd = () => {
    dispatch(endTimer());
  };

  const children = ({ remainingTime }) => {
    const remainingMinutes = remainingTime / 60;
    const index =
      remainingMinutes >= 60 ? (remainingMinutes >= 600 ? 11 : 12) : 14;
    const time = new Date(remainingTime * 1000);
    return time.toISOString().slice(index, 19);
  };

  if (!settings) {
    return;
  }

  return (
    <Container className="text-white px-5">
      <div className="sm:w-5/6 md:3/4 lg:w-7/12 mx-auto">
        {showSettings && <TimerSettings handleClose={toggleSettings} />}
        <div className="flex flex-wrap my-6 justify-between bg-snGray rounded-full w-full md:w-4/5 xl:w-1/2  mx-auto p-1">
          <Button
            onClick={() => changeCurrentTimer("work")}
            className={
              "px-1 flex-1 " +
              (currentTimer === "work" ? "bg-black" : "bg-snGray")
            }
          >
            Work
          </Button>
          <Button
            onClick={() => changeCurrentTimer("break")}
            className={
              "px-1 flex-1 " +
              (currentTimer === "break" ? "bg-black" : "bg-snGray")
            }
          >
            Short Break
          </Button>
          <Button
            onClick={() => changeCurrentTimer("longBreak")}
            className={
              "px-1 flex-1 " +
              (currentTimer === "longBreak" ? "bg-black" : "bg-snGray")
            }
          >
            Long Break
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-6xl flex ">
            <TimerCircle
              active={active}
              duration={settings[currentTimer] * 60}
              onEnd={onEnd}
            >
              {children}
            </TimerCircle>
          </div>
          <span className="mt-6 text-2xl">
            {pomodoros + (pomodoros > 1 ? " pomodoros" : " pomodoro")}
          </span>
          <div className="flex mt-6 space-x-6 items-center">
            <Button
              onClick={toggleStart}
              className={
                "rounded-lg text-xl px-8 py-3 " +
                (active ? " bg-snBlue" : " bg-snRed")
              }
            >
              {active ? "Stop" : "Start"}
            </Button>
            {active && (
              <Button
                onClick={onEnd}
                className="rounded-xl bg-snBlue cursor-pointer py-2 px-3"
              >
                <BsSkipEndFill size={26} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Timer;
