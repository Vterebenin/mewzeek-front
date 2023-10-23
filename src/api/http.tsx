import axios from "axios";

const http = axios.create({
  // todo: make an env var
  baseURL: "http://localhost:8000/api/",
});

export default http;
