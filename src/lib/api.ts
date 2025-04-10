import axios from 'axios'
import { API_URL } from '../constants'

const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

export default api
