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

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3333, () => console.log('Server is running on port 3333'))