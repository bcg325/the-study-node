import axios from "axios";

const API_URL = "/api/timer/";

const getSettings = async () => {
  const res = await axios.get(API_URL + "settings", {
    withCredentials: true,
  });

  return res.data;
};

const setSettings = async (timerSettings) => {
  const res = await axios.post(API_URL + "settings", timerSettings, {
    withCredentials: true,
  });

  return res.data;
};

const timerService = {
  getSettings,
  setSettings,
};

export default timerService;
