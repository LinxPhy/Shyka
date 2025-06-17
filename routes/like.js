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

app.post('/api/like_comment', async (req, res) => {
    
    try {

        const { user_id, comment_id } = req.body
        if (!user_id || !comment_id) return res.sendStatus(400)
        
        let voted = 0
        const removeLike = await generateQuery('DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?', [user_id, comment_id])
        
        if (removeLike.affectedRows === 0){
            await generateQuery('INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)', [user_id, comment_id])
            voted = 1
        }

        const [result] = await generateQuery('SELECT COUNT(*) as count FROM comment_likes WHERE comment_id = ?', [comment_id])
        const count = result.count

        res.send({ likes: count, voted })


    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.post('/api/like_reply', async (req, res) => {
    
    try {

        const { user_id, reply_id } = req.body
        if (!user_id || !reply_id) return res.sendStatus(400)
        
        let voted = 0
        const removeLike = await generateQuery('DELETE FROM reply_likes WHERE user_id = ? AND reply_id = ?', [user_id, reply_id])
        
        if (removeLike.affectedRows === 0){
            await generateQuery('INSERT INTO reply_likes (user_id, reply_id) VALUES (?, ?)', [user_id, reply_id])
            voted = 1
        }

        const [result] = await generateQuery('SELECT COUNT(*) as count FROM reply_likes WHERE reply_id = ?', [reply_id])
        const count = result.count

        res.send({ likes: count, voted })


    } catch (e) {
        console.log(e)
        res.sendStatus(500)    
    
    }

})


module.exports = app