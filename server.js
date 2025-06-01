require('dotenv').config()
const express = require('express');
const cors = require('cors')

const auth = require('./routes/auth')
const logs = require('./routes/logs')
const chatbots = require('./routes/chatbots')
const session = require('./routes/session')
const chat = require('./routes/chat')
const like = require('./routes/like')
const { processAllImages } = require('./scripts/optimise')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
))

app.use(auth)
app.use(logs)
app.use(chatbots)
app.use(session)
app.use(chat)
app.use(like)

// processAllImages()


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})