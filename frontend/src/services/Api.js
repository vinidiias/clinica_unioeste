import axios from 'axios'

const api = axios.create({
    baseURL: 'https://clinica-unioeste.vercel.app'
})

export default api
