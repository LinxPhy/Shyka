const express = require('express')
const { generateQuery } = require('../scripts/generateQuery')
const app = express()

app.post('/api/login', async (req, res) => {
    
    try {

        const { user, model } = req.body
        const { id, image, email } = user

        if (!email) return res.sendStatus(400)

        const check_user = await generateQuery("SELECT * FROM users WHERE email = ?", [email])
        if (check_user.length > 0) return res.sendStatus(200)
        
        const query = 'INSERT INTO users (user_id, email, image, model) VALUES (?, ?, ?, ?)'
        await generateQuery(query, [id, email, image, model])
        res.sendStatus(200)


    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

module.exports = app