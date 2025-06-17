const express = require('express')
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const { generateQuery } = require('../scripts/generateQuery')
const fs = require('fs')
const path = require('path')
const app = express()

const loadQueries = (filename) => {
    const filePath = path.join(__dirname, filename);
    const sqlFile = fs.readFileSync(filePath, 'utf8');

    const queries = {};
    const parts = sqlFile.split('-- ').slice(1);

    for (const part of parts) {
        const [name, ...queryLines] = part.split('\n');
        const query = queryLines.join('\n').trim();
        queries[name.trim()] = query;
    }

    return queries;
};

const queries = loadQueries('../queries/comments.sql');

app.get('/api/comments/:alias', async (req, res) => {

    try {
        const alias = req.params.alias
        const user_id = req.query.user_id
        // const { page } = req.query
        // const offset = (page - 1) * 10

        const comments = await generateQuery(queries.comments, [ user_id, alias])
        const ids = comments.map((comment) => comment.comment_id)
        const replies = ids.length > 0 ? await generateQuery(queries.replies, [user_id, ids]) : [];

        const data = comments.map((comment) => ({
            ...comment,
            replies: replies.filter((reply) => reply.comment_id === comment.comment_id)
        }));
        res.send(data)
        // const nextPage = await generateQuery(queries.comments, [alias])
        // const hasMore = nextPage.length > 0
        // res.send({ comments, hasMore })

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})


app.post('/api/add_comment', async (req, res) => {

    try { 
        const { user_id, alias, comment } = req.body
        await generateQuery(queries.addComment, [user_id, alias, comment])
        const result = await generateQuery(queries.getNewComment, [alias])

        const data = { ...result[0], replies: [] }

        res.send(data)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

app.post('/api/add_reply', async (req, res) => {
    
    try {
        const { user_id, reply_id, comment_id, message } = req.body
        await generateQuery(queries.addReply, [user_id, reply_id, comment_id, message])
        const result = await generateQuery(queries.getNewReply, [comment_id])
        res.send(result[0])

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})


app.get('/lorem', async (req, res) => {

    try {

        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: 8,
                min: 4
            },
            wordsPerSentence: {
                max: 16,
                min: 4
            }
        });

        const query = 'INSERT INTO replies (comment_id, parent_reply_id, user_id, content) VALUES (?, ?, ?, ?)'

        for (let i = 0; i < 30; i++) {
            // generate random number between 5 and 26
            const num = Math.floor(Math.random() * (26 - 5 + 1) + 5)

            const comment = lorem.generateSentences(2)
            await generateQuery(query, [num, num, '104643210861434931483', comment ])
        }

        res.sendStatus(200)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})


app.get('/api/stats', async (req, res) => {

    try {
        
        const alias = req.query.alias
        const messages = await generateQuery(queries.total_messages, [alias])
        const comments = await generateQuery(queries.total_comments, [alias, alias])
        const likes = await generateQuery(queries.total_likes, [alias])
        res.send({ messages: messages[0].messages, comments: comments[0].comments, likes: likes[0].likes })

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
})






module.exports = app