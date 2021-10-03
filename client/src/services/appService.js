import axios from "axios";

let token;

export const setToken = (newToken) => {
  token = newToken;
};

const baseURL = "http://localhost:3000";
const appService = axios.create({
  baseURL,
  withCredentials: true,
});

// appService.interceptors.request.use(req => {
//     console.log(`interceptor ${token}`)
//     if (token) {
//         console.log("huh?")
//      req.headers.Authorization = `Bearer ${token}`
//     }

//     return req
// })

appService.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (
      err.config.url.includes("/users/profile") ||
      err.response.status !== 401
    ) {
      return Promise.reject(err);
    }

    try {
      const results = await appService.get("/users/profile");
      return Promise.reject(err);
    } catch (retryError) {
      if (retryError.response.status === 401) {
        throw new Error("User is not logged in");
      }
    }

    return Promise.reject(err);
  }
);

export default appService;
