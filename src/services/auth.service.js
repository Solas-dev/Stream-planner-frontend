import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
// const API_URL = "https://planner.millbeelp.com/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  console.log("RR");
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const checkUser = (id) => {
  // console.log(id);
  return axios
    .get(API_URL + "checkUser?id=" + id)
    .then((res) => {
      return res.data.user;
    })
    .catch((err) => {
      return err;
    });
};

const addKey = (uuid, userId) => {
  return axios
    .post(API_URL + "addkey", {
      uuid,
      userId,
    })
    .then((res) => res.date);
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  checkUser,
  addKey,
};
