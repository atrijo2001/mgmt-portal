
//Module imports
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')

//Utilities
const connDB = require('./config/Db')
const errorHandler = require('./middleware/error')

//Routes
const userRoutes = require('./routes/User')
const projectRoutes = require('./routes/Project')

dotenv.config()
const app = express()
connDB()

//Middlewares
app.use(express.json())
app.use(morgan('combined'))

app.get('/', (req, res)=>{
    res.send("Welcome to the Management Portal")
})


//Applying the routes
app.use('/api/auth', userRoutes);
app.use('/api/project', projectRoutes)


app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server running on port ${process.env.PORT}`.yellow.bold))