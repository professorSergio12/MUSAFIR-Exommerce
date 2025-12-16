import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL_AWS,
    // baseURL: process.env.REACT_APP_API_URL_LOCAL,
    // baseURL: process.env.REACT_APP_API_URL_VERCEL,
    withCredentials: true,
})

export default axiosInstance;
