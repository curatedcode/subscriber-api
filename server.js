const express = require('express')
const app = express()

if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
mongoose.set('strictQuery', true)
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())



app.listen(3000, () => console.log("Server started"))