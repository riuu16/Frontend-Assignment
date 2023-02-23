import axios from "axios";
const instance = axios.create({
  baseURL: "https://backend-assignment-ten.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },    
});
export default instance;
