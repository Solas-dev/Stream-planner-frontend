import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

// const API_URL = "https://planner.millbeelp.com/api/";

const addEvent = (game, description, date, start, end, userId) => {
  return axios
    .post(API_URL + "event/add", {
      game,
      description,
      date,
      start,
      end,
      userId,
    })
    .then((response) => {
      return response.data;
    });
};

const updateEvent = (game, description, date, start, end, userId) => {
  return axios
    .post(API_URL + "event/update?id=" + userId, {
      game,
      description,
      date,
      start,
      end,
    })
    .then((response) => {
      return response.data;
    });
};

const getUserEvents = (userId) => {
  return axios.get(API_URL + "event?userId=" + userId).then((res) => {
    return res.data;
  });
};

const deleteEvent = (userId) => {
  return axios
    .post(API_URL + "event/delete", {
      userId,
    })
    .then((response) => {
      return response.data;
    });
};

const addRecurringEvent = (array) => {
  return axios.post(API_URL + "event/addrecurring", array).then((response) => {
    return response.data;
  });
};

// ?id=" + userId

export default {
  addEvent,
  getUserEvents,
  updateEvent,
  deleteEvent,
  addRecurringEvent,
};
