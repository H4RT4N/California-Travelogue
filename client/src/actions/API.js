import axios from "axios";

const API = axios.create({ baseURL: "https://calitravelogue-backend.herokuapp.com" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile"))
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    return req;
  });

export default API;