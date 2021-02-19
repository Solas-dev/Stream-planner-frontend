import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const addevent = (game, description, date, start, end, userId) => {
  return axios
    .post(API_URL + "event", {
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

const getUserEvents = (userId, date) => {
  // console.log(date);
  return axios
    .get(API_URL + "event" + "?userId=" + userId + "&date=" + date, {
      headers: authHeader(),
    })
    .then((res) => {
      // console.log("fewa");
      // console.log(res.data);
      return res.data;
    });
};

export default {
  addevent,
  getUserEvents,
};
