import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://13.60.22.108:4000/api',
    // baseURL: 'https://musafir-exommerce.vercel.app/api',
    withCredentials: true,
})

export default axiosInstance;
