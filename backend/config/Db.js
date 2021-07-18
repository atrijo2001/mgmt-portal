const mongoose = require('mongoose')
const colors = require('colors')

const connDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`.blue.inverse)   
    } catch (err) {
        console.log(`${err}`.red.bold)
    }
}

module.exports = connDB