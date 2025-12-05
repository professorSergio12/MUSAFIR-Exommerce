import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'http://16.16.67.71:4000/api',
    baseURL: 'http://localhost:4000/api',
    // baseURL: 'https://musafir-exommerce.vercel.app/api',
    withCredentials: true,
})

export default axiosInstance;
