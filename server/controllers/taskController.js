const mongoose = require("mongoose");
const Task = mongoose.model("Task");
const User = mongoose.model("User");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const { title, description, priority, dueDate, project } = req.body;

  const newTask = await Task.create({
    title,
    description,
    priority,
    dueDate,
    project,
    user: req.user.id,
  });

  if (newTask) {
    res.status(200).json(newTask);
  } else {
    res.status(400);
    throw new Error("Failed to create new task");
  }
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User unauthorized");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updatedTask) {
    res.status(200).json({ updatedTask });
  } else {
    res.status(400);
    throw new Error("Failed to update task");
  }
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User unauthorized");
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
};

const getTaskGroup = async (req, res) => {
  const groupName = req.params.group;

  const user = await User.findOne(
    {
      id: req.user.id,
      "taskGroups.name": groupName,
    },
    {
      "taskGroups.$": 1,
    }
  );

  if (user) {
    res.status(200).json({ groupName, tasks: user.taskGroups[0].tasks });
    return;
  } else {
    res.status(200).json({ tasks: null });
    return;
  }
};

const setTaskGroup = async (req, res) => {
  const groupName = req.params.group;
  const { taskIds } = req.body;

  const updateUser = await User.findOneAndUpdate(
    { _id: req.user.id, "taskGroups.name": groupName },
    {
      $set: {
        "taskGroups.$.tasks": taskIds,
      },
    },
    {
      new: true,
    }
  );

  if (updateUser) {
    res.status(200).json({});
  } else {
    try {
      const user = await User.findById(req.user.id);
      user.taskGroups.push({
        name: groupName,
        tasks: taskIds,
      });

      await user.save();
      res.status(200).json({});
    } catch (err) {
      res.status(400);
      throw new Error("Task group saving failed");
    }
  }

  res.status(400);
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskGroup,
  setTaskGroup,
};
