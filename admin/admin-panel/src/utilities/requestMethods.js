import axios from "axios";

// Base URL for the API
// const BaseURL = "http://localhost:1700/api/v1";
const BaseURL = "https://my-portfolio-d7ai.onrender.com/api/v1";

// Function to get the access token from local storage
const getToken = () => {
  try {
    const persistedState = localStorage.getItem("persist:root");
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      const userState = JSON.parse(parsedState.user);
      return userState.user?.access_token || null;
    }
  } catch (error) {
    console.error("Failed to parse persisted state:", error);
    return null;
  }
};

// Initial token value
let TOKEN = getToken();
console.log(TOKEN);

// Axios instance for public requests (no auth required)
const publicRequest = axios.create({
  baseURL: BaseURL,
});

// Axios instance for user requests (auth required)
const userRequest = axios.create({
  baseURL: BaseURL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// Interceptor to update the token dynamically
userRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { publicRequest, userRequest };
