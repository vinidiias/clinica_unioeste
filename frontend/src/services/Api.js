import axios from 'axios'

const api = axios.create({
    baseURL: 'https://deploybackendclinica.vercel.app'
})

export default api