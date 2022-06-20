import axios from "axios";

const BASE_URL = "/api/auth/";

const register = async (user) => {
  const res = await axios.post(
    BASE_URL + "register",
    {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const login = async (user) => {
  const res = await axios.post(
    BASE_URL + "login",
    {
      email: user.email,
      password: user.password,
    },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const logout = async () => {
  await axios.post(BASE_URL + "logout", {
    withCredentials: true,
  });
};

const getMe = async () => {
  const res = await axios.get(BASE_URL + "me", {
    withCredentials: true,
  });
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  getMe,
};

export default authService;
