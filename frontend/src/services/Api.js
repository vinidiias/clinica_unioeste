import axios from 'axios'
//'https://clinica-unioeste.vercel.app'
const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api
