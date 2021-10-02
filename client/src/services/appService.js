import axios from "axios";

let token;

export const setToken = (newToken) => {
    token = newToken
}

const baseURL = "http://localhost:3000"
const appService = axios.create({
    baseURL,
    withCredentials: true
})

appService.interceptors.request.use(req => {
    console.log(`interceptor ${token}`)
    if (token) {
        console.log("huh?")
     req.headers.Authorization = `Bearer ${token}`   
    }
    
    return req
})

export default appService