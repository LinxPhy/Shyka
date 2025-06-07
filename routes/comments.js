const express = require('express')
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
        // const { page } = req.query
        // const offset = (page - 1) * 10

        const comments = await generateQuery(queries.comments, [alias])
        const ids = comments.map((comment) => comment.comment_id)
        const replies = ids.length > 0 ? await generateQuery(queries.replies, [ids]) : [];

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
        const result = await generateQuery(queries.addComment, [user_id, alias, comment])
        res.send(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// app.post('/api/add_reply', async (req, res) => {

// })


module.exports = app