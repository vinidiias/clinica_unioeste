import axios from 'axios'
//'https://clinica-unioeste.vercel.app'
const api = axios.create({
    baseURL: 'https://clinica-unioeste.vercel.app'
})

export default api
