import axios from "axios";

export const api = axios.create({
  baseURL: "https://m6-tasks-manager.herokuapp.com/",
  timeout: 10000,
});