import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const TaskList = ({ columnId, taskList, handleUpdate, currentTabDate }) => {
  if (taskList.length === 0) return null;
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps}>
          {taskList.map((task, index) => (
            <Task
              index={index}
              key={task.id}
              task={task}
              handleUpdate={handleUpdate}
              currentTabDate={currentTabDate}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
export default TaskList;
