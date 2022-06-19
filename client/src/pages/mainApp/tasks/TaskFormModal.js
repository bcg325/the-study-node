import Button from "../../../components/utilities/Button";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import ModalOverlay from "../../../components/utilities/ModalOverlay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";
import { BsBookmarkStarFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";

const TaskFormModal = ({
  handleClose,
  handleSaveTask,
  currentTask,
  initialDate,
}) => {
  const [taskName, setTaskName] = useState(
    (currentTask && currentTask.title) || ""
  );

  const [priority, setPriority] = useState({
    important:
      (currentTask &&
        (currentTask.priority === 1 || currentTask.priority === 3)) ||
      false,
    urgent:
      (currentTask &&
        (currentTask.priority === 2 || currentTask.priority === 3)) ||
      false,
  });

  const [priorityVal, setPriorityVal] = useState(
    (currentTask && currentTask.priority) || 0
  );
  let priorityColor;

  const [date, setDate] = useState(
    (currentTask && new Date(currentTask.dueDate)) || null
  );
  const [time, setTime] = useState(() => {
    if (currentTask && currentTask.dueDate) {
      const currentDate = new Date(currentTask.dueDate);
      if (
        currentDate.getHours() === 23 &&
        currentDate.getMinutes() === 59 &&
        currentDate.getSeconds() === 59
      ) {
        return null;
      }
      return currentDate;
    }
    return null;
  });

  const defaultDateOptions = {
    noDate: false,
    today: false,
    tomorrow: false,
  };
  const [dateOptions, setDateOptions] = useState(defaultDateOptions);

  const onDateOptionChange = (option) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    setDate(null);
    setTime(null);
    switch (option) {
      case "today":
        onDateChange(today);
        break;
      case "tomorrow":
        onDateChange(tomorrow);
        break;
      default:
        setDate(null);
        break;
    }

    setDateOptions((prevState) => ({
      ...defaultDateOptions,
      [option]: !prevState[option],
    }));
  };

  useEffect(() => {
    if (initialDate) {
      onDateOptionChange(initialDate);
    }
  }, []);

  useEffect(() => {
    if (!date) {
      return;
    }
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (newDate.toDateString() === today.toDateString()) {
      setDateOptions((prevState) => ({
        noDate: false,
        today: true,
        tomorrow: false,
      }));
    } else if (newDate.toDateString() === tomorrow.toDateString()) {
      setDateOptions((prevState) => ({
        noDate: false,
        today: false,
        tomorrow: true,
      }));
    }
  }, [date]);

  const onDateChange = (newDate) => {
    setDateOptions(defaultDateOptions);
    newDate.setHours(23, 59, 59);
    setDate(newDate);
  };

  const onTimeChange = (newTime) => {
    if (date) {
      if (!newTime) {
        setTime(newTime);
        const newDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          59,
          59
        );
        setDate(newDate);
      } else {
        const newDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          newTime.getHours(),
          newTime.getMinutes()
        );
        setDate(newDate);
        setTime(newTime);
      }
    }
  };

  useEffect(() => {
    setPriorityVal(
      0 + (priority.important ? 1 : 0) + (priority.urgent ? 2 : 0)
    );
  }, [priority]);

  const onPriorityChange = (property) => {
    setPriority((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };

  const onSave = () => {
    if (taskName) {
      handleClose();
      handleSaveTask({
        title: taskName,
        priority: priorityVal,
        dueDate: date,
      });
    }
  };

  const onCancel = () => {
    if (!currentTask) {
      setTaskName("");
      setDate(null);
      setTime(null);
      setPriority({
        important: false,
        urgent: false,
      });
      setPriorityVal(0);
      setDateOptions(defaultDateOptions);
    } else {
      setTaskName(currentTask.title);
      setDate(new Date(currentTask.dueDate));
      setPriority({
        important: currentTask.priority === 1 || currentTask.priority === 3,
        urgent: currentTask.priority === 2 || currentTask.priority === 3,
      });
      setPriorityVal(currentTask.priority);
    }
  };

  switch (priorityVal) {
    case 1:
      priorityColor = "text-priorityBlue";
      break;
    case 2:
      priorityColor = "text-priorityYellow";
      break;
    case 3:
      priorityColor = "text-priorityRed";
      break;
    default:
      break;
  }

  return ReactDOM.createPortal(
    <>
      <div className="overflow-y-hidden bg-snLightGray w-full h-full flex flex-col items-center text-white overflow-y-auto fixed inset-x-0 mx-auto my-auto inset-y-0 w-[90vw] min-h-[30.5rem] max-h-[35rem] md:w-[32rem] md:h-[30.5rem] rounded-2xl shadow-2xl z-50">
        <span
          onClick={handleClose}
          className="absolute right-2 top-1.5 cursor-pointer rounded-lg hover:bg-gray-700 p-1 "
        >
          <AiOutlineCloseCircle className="" size={24} />
        </span>
        <textarea
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          maxLength="150"
          className="mt-10 w-5/6 resize-none min-h-12 max-h-20 lg:h-20 focus:outline-none bg-snGray p-3 rounded-lg "
        ></textarea>
        <div className=" w-5/6 mt-6">
          <span className="text-lg flex items-center gap-2">
            <MdDateRange />
            Due Date
          </span>
          <div className="mt-3 w-full flex flex-wrap sm:flex-nowrap gap-y-3 ">
            <DatePicker
              placeholderText="Set date"
              minDate={new Date()}
              className="bg-snGray h-10 w-[10.5rem] text-white focus:outline-none rounded-lg p-1 px-3"
              selected={date}
              onChange={(date) => onDateChange(date)}
              dateFormat="MMMM d, yyyy"
              calendarClassName="bg-gray-400"
              showPopperArrow={false}
            />
            <DatePicker
              placeholderText="Set time"
              className="bg-snGray h-10 w-[10.5rem] text-white focus:outline-none rounded-lg p-1 px-3"
              selected={time}
              onChange={(time) => onTimeChange(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              showPopperArrow={false}
              isClearable={true}
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Button
              className={
                (dateOptions.noDate ? "bg-snBlue" : "bg-gray-600") +
                " text-sm px-4  "
              }
              onClick={() => onDateOptionChange("noDate")}
            >
              None
            </Button>
            <Button
              className={
                (dateOptions.today ? "bg-snBlue" : "bg-gray-600") + " text-sm"
              }
              onClick={() => onDateOptionChange("today")}
            >
              Today
            </Button>
            <Button
              className={
                (dateOptions.tomorrow ? "bg-snBlue" : "bg-gray-600") +
                " text-sm"
              }
              onClick={() => onDateOptionChange("tomorrow")}
            >
              Tomorrow
            </Button>
          </div>
        </div>
        <div className=" w-5/6 mt-7">
          <span className="text-lg flex items-center gap-2">
            {priorityVal > 0 ? (
              <BsBookmarkStarFill className={priorityColor} size={16} />
            ) : (
              <BsBookmarkStar size={16} />
            )}
            Priority
            <span className="ml-1 font-light">{priorityVal}</span>
          </span>
          <div className="mt-4 flex gap-3">
            <Button
              className={
                (priority.important ? "bg-snBlue" : "bg-gray-600") + " text-sm"
              }
              onClick={() => onPriorityChange("important")}
            >
              Important
            </Button>
            <Button
              className={
                (priority.urgent ? "bg-snBlue" : "bg-gray-600") + " text-sm"
              }
              onClick={() => onPriorityChange("urgent")}
            >
              Urgent
            </Button>
          </div>
        </div>
        <div className="flex mt-10 gap-7">
          <Button onClick={onCancel} className="bg-snRed">
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className={taskName ? "bg-snBlue" : "bg-gray-500"}
          >
            Save
          </Button>
        </div>
      </div>

      <ModalOverlay
        className="bg-black bg-opacity-30	"
        handleClose={handleClose}
      />
    </>,
    document.querySelector("#modal")
  );
};
export default TaskFormModal;
