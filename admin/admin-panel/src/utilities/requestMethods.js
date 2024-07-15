import axios from "axios";

// const BASE_URI = "https://rymo-shop-api.onrender.com/api/v1";
const BASE_URI = "http://localhost:1700/api/v1";
const TOKEN =
  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
    ?.access_token || null;

console.log(TOKEN);

// Public Request
export const publicRequest = axios.create({
  baseURL: BASE_URI,
});

// User Request
export const userRequest = axios.create({
  baseURL: BASE_URI,
  headers: { token: `Bearer ${TOKEN}` },
});
