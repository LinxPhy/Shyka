const express = require('express')
const { generateQuery } = require('../scripts/generateQuery')
const app = express()

app.post('/api/likes', async (req, res) => {
    
    try {
        const { user_id, alias } = req.body
        if (!user_id || !alias) return res.sendStatus(400)
        
        let voted = 0
        const removeLike = await generateQuery('DELETE FROM likes WHERE user_id = ? AND alias = ?', [user_id, alias])
        
        if (removeLike.affectedRows === 0){
            await generateQuery('INSERT INTO likes (user_id, alias) VALUES (?, ?)', [user_id, alias])
            voted = 1
        }

        const [result] = await generateQuery('SELECT COUNT(*) as count FROM likes WHERE alias = ?', [alias])
        const count = result.count

        res.send({ likes: count, voted })


    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }


})


module.exports = app