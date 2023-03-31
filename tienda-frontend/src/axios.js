import axios from "axios";

const instance = axios.create({
  baseURL: "store-mern-two.vercel.app",
});

export default instance;
