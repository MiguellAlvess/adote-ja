const express = require('express')
const cors = require('cors')

const app = express()

// config JSON reponse
app.use(express.json())

// solve CORS
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5174', 'http://localhost:5173'], // Múltiplas origens
}));

// public folder for images
app.use(express.static('public'))

// routes
const userRoutes = require('./routes/userRoutes')
const petRoutes = require('./routes/petRoutes')

app.use('/users', userRoutes)
app.use('/pets', petRoutes)

app.listen(5000)