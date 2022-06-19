import Button from "../../../components/utilities/Button";
import Input from "../../../components/utilities/Input";
import Card from "../../../components/utilities/Card";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimer } from "../../../features/timerSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ModalOverlay from "../../../components/utilities/ModalOverlay";
import Switch from "react-switch";
import { setTimerSettings } from "../../../features/timerSlice";

const TimerSettings = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.timer);
  const [isValid, setIsValid] = useState(true);
  const [formSettings, setFormSettings] = useState({
    work: settings.work,
    break: settings.break,
    longBreak: settings.longBreak,
    longBreakInterval: settings.longBreakInterval,
    autoContinue: settings.autoContinue,
    alarm: settings.alarm,
  });

  const onChange = ({ target }) => {
    let { name, value } = target;

    if (
      value > 1439 &&
      (name === "work" || name === "break" || name === "longBreak")
    ) {
      value = 1439;
    }

    setFormSettings((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
  };

  useEffect(() => {
    if (
      !formSettings.work ||
      formSettings.work <= 0 ||
      formSettings.work > 1439 ||
      !formSettings.longBreakInterval ||
      formSettings.longBreakInterval < 1
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [formSettings]);

  const onToggle = (name) => {
    setFormSettings((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const onSave = (e) => {
    e.preventDefault();
    if (isValid) {
      if (!formSettings.break) {
        formSettings.break = 0;
      }
      if (!formSettings.longBreak) {
        formSettings.longBreak = 0;
      }
      dispatch(setTimer(formSettings));
      dispatch(setTimerSettings({ timerSettings: formSettings }));
      handleClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      <Card className="text-white fixed inset-x-0 mx-auto my-auto inset-y-0 h-[31rem] w-[16rem] xs:w-[20rem] xs:h-[31rem] md:h-[30rem] md:w-[24rem] bg-snLightGray border-none z-50 ">
        <span
          onClick={handleClose}
          className="absolute right-2 top-1.5 cursor-pointer rounded-lg hover:bg-gray-700 p-1"
        >
          <AiOutlineCloseCircle className="" size={24} />
        </span>
        <h3 className="text-lg">Time (minutes)</h3>
        <form>
          <div className="flex space-x-4 items-end justify-center pt-3 pb-6 border-b border-gray-700">
            <div className="flex flex-col gap-2">
              <label htmlFor="work">Work</label>
              <Input
                required
                name="work"
                id="work"
                type="number"
                step="0.1"
                min="1"
                max="1439"
                value={formSettings.work}
                onChange={onChange}
                className="bg-snGray border-none mb-0 !text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="break">Break</label>
              <Input
                name="break"
                id="break"
                type="number"
                step="0.1"
                placeholder="0"
                min="0"
                max="1439"
                value={formSettings.break}
                onChange={onChange}
                className="bg-snGray border-none mb-0 !text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="longBreak">Long Break</label>
              <Input
                name="longBreak"
                id="longBreak"
                placeholder="0"
                value={formSettings.longBreak}
                onChange={onChange}
                type="number"
                min="0"
                max="1439"
                className="bg-snGray border-none  mb-0 !text-white"
              />
            </div>
          </div>
          <div className="flex items-center py-6 border-b border-gray-700">
            <label htmlFor="longBreakInterval" className="mr-4">
              Long Break Interval{" "}
            </label>
            <Input
              name="longBreakInterval"
              id="longBreakInterval"
              placeholder="1"
              value={formSettings.longBreakInterval}
              onChange={onChange}
              type="number"
              min="1"
              className="bg-snGray border-none mb-0 !text-white w-[6.5rem]"
            />
          </div>
          <div className="flex align-center justify-between pr-7 py-6 border-b border-gray-700">
            <label htmlFor="autoStart">Auto-start Timers</label>
            <Switch
              id="autoStart"
              onChange={() => onToggle("autoContinue")}
              checked={formSettings.autoContinue}
            />
          </div>
          <div className="flex align-center justify-between pr-7 pt-6 pb-3">
            <label htmlFor="alarm">Alarm Sound</label>
            <Switch
              id="alarm"
              onChange={() => onToggle("alarm")}
              checked={formSettings.alarm}
            />
          </div>
          <div className="flex mt-8 space-x-6 justify-center">
            <Button
              onClick={onSave}
              className={"w-1/2 " + (isValid ? "bg-snBlue" : "bg-gray-500")}
            >
              Save
            </Button>
          </div>
        </form>
      </Card>
      <ModalOverlay
        className="bg-black bg-opacity-30"
        handleClose={handleClose}
      />
    </>,
    document.querySelector("#modal")
  );
};
export default TimerSettings;
