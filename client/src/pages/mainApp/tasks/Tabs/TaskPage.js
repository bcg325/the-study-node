import TaskList from "../TaskList";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import selectOnDragEnd from "../../../../selectors/selectOnDragEnd";
import { createTask } from "../../../../features/taskSlice";
import TaskFormModal from "../TaskFormModal";
import { useSelector, useDispatch } from "react-redux";
import { setTaskGroup, getTaskGroup } from "../../../../features/taskSlice";
import { updateTaskGroup } from "../../../../features/taskSlice";
import Button from "../../../../components/utilities/Button";
import { AiOutlinePlus } from "react-icons/ai";
import taskImg from "../../../../assets/images/tasks.svg";

const TaskPage = ({ tasks, name, date }) => {
  const dispatch = useDispatch();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasksOrder, setTasksOrder] = useState(null);

  const { taskGroups } = useSelector((state) => state.tasks);

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  useEffect(() => {
    dispatch(getTaskGroup(name));
  }, []);

  useEffect(() => {
    const taskIds = Object.keys(tasks);
    if (taskGroups[name] && taskIds.length > 0) {
      const taskPositions = {};
      for (const [index, id] of taskGroups[name].entries()) {
        taskPositions[id] = index;
      }
      const orderedTasks = taskIds.sort(
        (a, b) => taskPositions[a] - taskPositions[b]
      );
      setTasksOrder(orderedTasks);
    } else {
      setTasksOrder(taskIds);
    }
  }, [tasks, name, taskGroups, dispatch]);

  const setOrderCallback = (taskIds) => {
    dispatch(setTaskGroup({ groupName: name, taskIds }));
  };

  const onDragEnd = (result) =>
    selectOnDragEnd(result, tasks, tasksOrder, setTasksOrder, setOrderCallback);

  const onCreateTask = (taskData) => {
    dispatch(createTask(taskData));
  };

  const onUpdateTask = (taskId, remove) => {
    const tempArr = taskGroups[name];
    if (tempArr) {
      const alteredArr = tempArr.filter((id) => id !== taskId);

      if (!remove) {
        dispatch(updateTaskGroup({ groupName: name, taskIds: alteredArr }));
      }
      dispatch(setTaskGroup({ groupName: name, taskIds: alteredArr }));
    }
  };

  return (
    <>
      {showTaskForm && (
        <TaskFormModal
          handleSaveTask={onCreateTask}
          handleClose={toggleTaskForm}
          initialDate={date && name ? name : null}
        />
      )}
      <div className="flex w-full justify-between gap-4 mt-2 mb-4">
        <h1 className=" text-2xl pb-2 gap-3 sticky flex flex-wrap">
          <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
          <span className="font-light">
            {date &&
              date.toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
          </span>
        </h1>
        <Button
          onClick={toggleTaskForm}
          className="flex gap-2 items-center justify-center !px-3 min-h-10 max-h-16  bg-snRed rounded-lg"
        >
          <AiOutlinePlus size={20} className="text-white" />
          <span>Add Task</span>
        </Button>
      </div>

      {tasks && Object.keys(tasks).length <= 0 && tasksOrder && (
        <div className="flex flex-col items-center">
          <img
            src={taskImg}
            className="w-[14rem]"
            alt="illustration of a task list page"
          />
          <h2 className="text-xl mt-4">No Tasks Added</h2>
        </div>
      )}

      {tasks && Object.keys(tasks).length > 0 && tasksOrder && (
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <TaskList
              columnId={name + "tasks"}
              taskList={tasksOrder.flatMap((taskId) =>
                tasks[taskId] ? tasks[taskId] : []
              )}
              handleUpdate={onUpdateTask}
              currentTabDate={date}
            />
          </DragDropContext>
        </div>
      )}
    </>
  );
};
export default TaskPage;
