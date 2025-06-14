
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

const queries = loadQueries('../queries/queries.sql');

app.get('/api/chatbot/:alias', async (req, res) => {
    try {
        const alias = req.params.alias
        const user_id = req.query.user_id
        const result = await generateQuery(queries.chatbot, [user_id, alias])
        res.send(result[0])
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


app.get('/api/categories', async (req, res) => {

    try {
        const result = await generateQuery(queries.categories)
        const categories = result.map((category) => category.category)
        res.send(categories)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.get('/api/categories/:category', async (req, res) => {

    try {
        const category = req.params.category
        const user_id = req.query.user_id

        if (category === 'reccomended'){
            const result = await generateQuery(queries.reccomendations, [user_id])
            return res.send(result)
        }

        const result = await generateQuery(queries.category, [user_id, category])
        res.send(result)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.get('/api/reccomendations', async (req, res) => {

    try {
        const user_id = req.query.user_id
        const result = await generateQuery(queries.reccomendations, [user_id])
        res.send(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


app.get('/api/flavour', async (req, res) => {

    try {
        const user_id = req.query.user_id
        const result = await generateQuery(queries.flavour, [user_id])
        res.send(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.get('/api/popular', async (req, res) => {

    try {
        const user_id = req.query.user_id
        const result = await generateQuery(queries.popular, [user_id])
        res.send(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})


app.get('/api/chatbot_likes', async (req, res) => {

    try {   
        const { user_id, page } = req.query
        if (!user_id) return res.sendStatus(400)
        
        const offset = (parseInt(page) - 1) * 7
        const chatbots = await generateQuery(queries.likes, [user_id, offset])
        const nextPage = await generateQuery(queries.likes, [user_id, offset + 7])
        const hasMore = nextPage.length > 0
        res.send({ likes: chatbots, hasMore })
        
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})


app.get('/api/recent', async (req, res) => {
    
    try {

        const user_id = req.query.user_id
        const recent = req.query.recent
        const data = recent.split(',')

        if (data.length > 10) {
            data.splice(10)
        }

        const result = await generateQuery(queries.recent, [user_id, data])
        res.send(result)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})


app.get('/api/explore', async (req, res) => {

    try {

        const query = 'SELECT * FROM chatbots ORDER BY name ASC LIMIT 5'
        const result = await generateQuery(query)
        res.send(result)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})


app.get('/api/search/:query', async (req, res) => {

    try {
        const user_id = req.query.user_id
        const search = req.params.query
        const result = await generateQuery(queries.search, [user_id, `%${search}%`])
        res.send(result)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }


})


module.exports = app