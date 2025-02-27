import axios from 'axios'
import {refreshAccessToken} from '../Services/AuthenticationService'
import { href } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5000/api/v1'

const PUBLIC_ENDPOINT = ['/product']

const Api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Attach token to every request if available
Api.interceptors.request.use((config) => {
    // Check if the request is not to the public endpoint and is a GET request
    const isPublicEndpoint = PUBLIC_ENDPOINT.some((endpoint) => config.url.includes(endpoint)) && config.method === 'get';
    
    // Add token only if it's not a public endpoint
    if (!isPublicEndpoint) {
        const token = localStorage.getItem("access_token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, (error) => Promise.reject(error));

Api.interceptors.response.use((response) => response, 
async (error) => {
    if (!error.response) {
        console.error("Network error: ", error)
        return Promise.reject(new Error("Network error, please try again."))
    }
    const originalRequest = error.config;

    if (error.response.status == 401 && !originalRequest._retry){
        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem("refresh_token");
            if(!refreshToken) {
                console.log("No refresh token, redirecting to login...")
                handLogout()
                return Promise.reject(new Error("Session expired. Please log in again."));
            }

            const newAccessToken = await refreshAccessToken(refreshToken)

            localStorage.setItem("access_token",newAccessToken);
            
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return Api(originalRequest)
        } catch (error) {
            console.log("Refresh token expired, logging out...");
            handLogout()
            return Promise.reject(new Error("Session expired. Please log in again."))
        }
    }
    return Promise.reject(error)
}
)

const handLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "/login"
}
export default Api
