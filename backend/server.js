const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddlewear')
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/flashcards', require('./routes/flashcardRoutes'))

app.use(errorHandler)

app.listen(port, console.log(`Server started on port ${port}`))