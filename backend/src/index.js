const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()
const dbUri = process.env.DB_URI
const router = require('./Routes/Router')

mongoose.connect(dbUri, {
    dbName: 'clinica',  // Verifique se o dbName está correto aqui
})
.then((res) => {
    console.log('Connected to database')
}).catch((err) => console.log(err))

const allowedOrigins = ['http://localhost:3000', 'https://clinica-unioeste-pi.vercel.app']; // Substitua pela URL do frontend hospedado
app.use(cors({
    origin: function (origin, callback) {
        // Verifica se a origem da requisição está na lista de origens permitidas
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Inclua os métodos permitidos
    res.header("Access-Control-Allow-Credentials", "true"); // Permite cookies e autenticação, se necessário
    next();
});

app.use(express.json({ limit: '10mb' }))
app.use(router)

app.listen(3333, () => console.log('Server is running on port 3333'))
