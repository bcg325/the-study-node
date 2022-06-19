import axios from "axios";

const API_URL = "/tasks/";

const getTasks = async () => {
  const res = await axios.get(API_URL, {
    withCredentials: true,
  });

  return res.data;
};

const createTask = async (taskData) => {
  const res = await axios.post(API_URL, taskData, {
    withCredentials: true,
  });

  return res.data;
};

const updateTask = async (taskId, taskData) => {
  const res = await axios.patch(API_URL + taskId, taskData, {
    withCredentials: true,
  });

  return res.data;
};

const deleteTask = async (taskId) => {
  const res = await axios.delete(API_URL + taskId, {
    withCredentials: true,
  });

  return res.data;
};

const getTaskGroup = async (groupName) => {
  const res = await axios.get(`${API_URL}taskGroup/${groupName}`, {
    withCredentials: true,
  });

  return res.data;
};

const setTaskGroup = async (groupName, taskIds) => {
  const res = await axios.post(
    `${API_URL}taskGroup/${groupName}`,
    { taskIds },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskGroup,
  setTaskGroup,
};

export default taskService;
