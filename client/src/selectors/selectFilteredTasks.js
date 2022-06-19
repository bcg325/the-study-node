const selectFilteredTasks = (tasks) => {
  let filtered = {
    all: {},
    today: {},
    tomorrow: {},
    upcoming: {},
  };

  if (tasks.length <= 0) {
    return filtered;
  }

  const sorted = [...tasks].sort((a, b) => {
    if (!a.dueDate) {
      if (!b.dueDate) {
        return a.priority < b.priority ? 1 : a.priority > b.priority ? -1 : 0;
      }
      return -1;
    }

    if (!b.dueDate) {
      return 1;
    }

    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);

    aDate.setMilliseconds(0);
    bDate.setMilliseconds(0);

    const aDateVal = aDate.getTime();
    const bDateVal = bDate.getTime();

    if (aDateVal > bDateVal) {
      return 1;
    } else if (aDateVal === bDateVal) {
      return a.priority < b.priority ? 1 : a.priority > b.priority ? -1 : 0;
    }
    return -1;
  });

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  sorted.forEach((task) => {
    if (task.completed) {
      return;
    }

    filtered.all[task.id] = task;

    if (!task.dueDate) {
      return;
    }

    const taskDate = new Date(task.dueDate);

    if (taskDate.toDateString() === today.toDateString()) {
      filtered.today[task.id] = task;
      return;
    } else if (taskDate.toDateString() === tomorrow.toDateString()) {
      filtered.tomorrow[task.id] = task;
      filtered.upcoming[task.id] = task;
      return;
    }

    const taskDateVal = taskDate.getTime();
    const todayVal = today.getTime();

    if (taskDateVal > todayVal) {
      filtered.upcoming[task.id] = task;
      return;
    }

    return;
  });

  return filtered;
};

export default selectFilteredTasks;
