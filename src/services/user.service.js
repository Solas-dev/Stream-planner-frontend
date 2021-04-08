import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

// const API_URL = "https://planner.millbeelp.com/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

// const checkToken = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };

// console.log(checkToken());

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  // checkToken,
  getModeratorBoard,
  getAdminBoard,
};
