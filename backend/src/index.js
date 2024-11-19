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

const allowedOrigins = ['http://localhost:3000', 'https://clinica-unioeste-pi.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'auth'],
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }))
app.use(router)

app.listen(3333, () => console.log('Server is running on port 3333'))
