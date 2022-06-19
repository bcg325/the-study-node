const selectOnDragEnd = (
  result,
  tasks,
  tasksOrder,
  setTasksOrder,
  setOrderCallback
) => {
  const { destination, source, draggableId } = result;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const taskToMove = tasks[tasksOrder[source.index]];
  const taskToReplace = tasks[tasksOrder[destination.index]];

  const taskToMoveDate = new Date(taskToMove.dueDate);
  const taskToReplaceDate = new Date(taskToReplace.dueDate);

  taskToMoveDate.setMilliseconds(0);
  taskToReplaceDate.setMilliseconds(0);

  if (
    taskToReplaceDate.getTime() < taskToMoveDate.getTime() ||
    taskToReplaceDate.getTime() > taskToMoveDate.getTime()
  ) {
    return;
  }

  if (
    taskToReplace.priority > taskToMove.priority ||
    taskToReplace.priority < taskToMove.priority
  ) {
    return;
  }

  const newTasksOrder = [...tasksOrder];
  newTasksOrder.splice(source.index, 1);
  newTasksOrder.splice(destination.index, 0, draggableId);

  setTasksOrder(newTasksOrder);
  setOrderCallback(newTasksOrder);
};

export default selectOnDragEnd;
