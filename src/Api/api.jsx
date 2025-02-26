import axios from 'axios'
import {refreshAccessToken} from '../Services/AuthenticationService'

const API_BASE_URL = 'http://localhost:5000/api/v1'

const PUBLIC_ENDPOINT = ['/product']

const Api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})


export default Api
