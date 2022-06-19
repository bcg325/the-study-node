import { useState } from "react";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../features/taskSlice";
import { updateTask } from "../../../features/taskSlice";
import TaskFormModal from "./TaskFormModal";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ index, task, handleUpdate, currentTabDate }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(task.completed);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const onUpdateTask = (taskData) => {
    handleUpdate(task.id, false);
    dispatch(
      updateTask({
        id: task.id,
        taskData,
      })
    );
  };

  const toggleChecked = (e) => {
    e.stopPropagation();
    setChecked(!checked);
    handleUpdate(task.id, true);
    dispatch(deleteTask(task.id));
  };

  const dateOptions = { month: "short", day: "numeric" };
  let dateStyling;

  if (task.dueDate) {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const dueDateYear = dueDate.getFullYear();

    if (dueDate.getTime() < now.getTime()) {
      dateStyling = "text-red-400";
    }
    if (now.getFullYear() !== dueDateYear) {
      dateOptions.year = "2-digit";
    }
    if (currentTabDate && dueDate.getDate() === currentTabDate.getDate()) {
      delete dateOptions.day;
      delete dateOptions.month;
    }

    if (
      !(
        dueDate.getHours() === 23 &&
        dueDate.getMinutes() === 59 &&
        dueDate.getSeconds() === 59
      )
    ) {
      dateOptions.hour = "numeric";
      dateOptions.minute = "numeric";
    }
  }

  const formattedDate =
    task.dueDate &&
    Object.keys(dateOptions).length > 0 &&
    new Date(task.dueDate).toLocaleString("en-US", dateOptions);

  let priorityStyling;

  switch (task.priority) {
    case 1:
      priorityStyling = "border-priorityBlue";
      break;
    case 2:
      priorityStyling = "border-priorityYellow";
      break;
    case 3:
      priorityStyling = "border-priorityRed";
      break;
    default:
      priorityStyling = "border-snLightGray";
      break;
  }
  const taskStyles = `border-l-4 ${priorityStyling} rounded list-none w-full flex items-center space-x-3 my-1.5 ml-2 p-1.5 bg-snLightGray justify-between cursor-pointer`;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          onClick={() => {
            showTaskForm || toggleTaskForm();
          }}
          className={taskStyles}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {showTaskForm && (
            <TaskFormModal
              handleClose={toggleTaskForm}
              handleSaveTask={onUpdateTask}
              currentTask={{
                title: task.title,
                dueDate: task.dueDate,
                priority: task.priority,
              }}
            />
          )}
          <div
            className={
              "flex space-x-3 items-center px-2 " + (!formattedDate && "py-1.5")
            }
          >
            <span>
              {checked ? (
                <ImCheckboxChecked className=" cursor-pointer" size={22} />
              ) : (
                <ImCheckboxUnchecked
                  onClick={toggleChecked}
                  className=" cursor-pointer"
                  size={22}
                />
              )}
            </span>
            <div>
              <span className="text-md line-clamp-3">{task.title}</span>
              <p
                className={`text-sm font-light line-clamp-1 ${
                  dateStyling && dateStyling
                }`}
              >
                {formattedDate}
              </p>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
export default Task;
