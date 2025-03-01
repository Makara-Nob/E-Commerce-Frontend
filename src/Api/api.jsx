import axios from 'axios'
import { refreshAccessToken } from '../Services/AuthenticationService'

const API_BASE_URL = 'http://localhost:5000/api/v1'
const PUBLIC_ENDPOINT = ['/product']

const Api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

let isRefreshing = false

Api.interceptors.request.use((config) => {
    // Check if the request is not to the public endpoint and is a GET request
    const isPublicEndpoint = PUBLIC_ENDPOINT.some((endpoint) => config.url.includes(endpoint)) && config.method === 'get'
    const accessToken = localStorage.getItem("access_token")
    // Only add token if it's not a public endpoint
    if (!isPublicEndpoint) {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
    }
    return config
}, (error) => Promise.reject(error))

Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) {
            console.error("Network error:", error)
            return Promise.reject(new Error("Network error, please try again."))
        }
        const originalRequest = error.config
        // Handle 401 Unauthorized
        if (error.response.status === 401 && !originalRequest._retry) {
            if(isRefreshing) return Promise.reject(error);
            isRefreshing = true
            originalRequest._retry = true
            try {
                const newToken = await refreshAccessToken()
                if(newToken){
                    localStorage.setItem("access_token",newToken)
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    return Api(originalRequest)
                }   
            } catch (refreshError) {
                localStorage.removeItem("access_token")
                window.location.href = "/login"
                return Promise.reject(new Error("Session expired. Please log in again."))
            }
        }
        // Handle 500 Internal Server Error
        if (error.response.status === 500) {
            console.error('Server error:', error)
            return Promise.reject(new Error('Internal server error. Please try again later.'))
        }
        return Promise.reject(error)
    }
)

export default Api
