import axios from 'axios'
import { API_URL } from '../constants'

const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
})

api.interceptors.request.use(
    async config => {
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

export default api
