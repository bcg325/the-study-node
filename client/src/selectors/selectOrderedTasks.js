const selectOrderedTasks = (orderedIds, taskIds) => {
  const taskPositions = {};
  for (const [index, id] of orderedIds.entries()) {
    taskPositions[id] = index;
  }
  const orderedTasks = taskIds.sort(
    (a, b) => taskPositions[a] - taskPositions[b]
  );
  return orderedTasks;
};

export default selectOrderedTasks;
