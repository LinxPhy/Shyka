
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
        const result = await generateQuery(queries.chatbot, [alias])
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
        const query = 'SELECT * FROM chatbots WHERE category = ? ORDER BY name ASC LIMIT 28'
        const result = await generateQuery(query, [category])
        res.send(result)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.get('/api/reccomendations', async (req, res) => {

    try {
        const result = await generateQuery(queries.reccomendations)
        res.send(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


app.get('/api/flavour', async (req, res) => {

    try {
        const query = 'SELECT * FROM chatbots ORDER BY name ASC'
        const result = await generateQuery(query)
        res.send(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

app.get('/api/chatbot_likes', async (req, res) => {
    
    try {
        const result = await generateQuery(queries.likes)
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
        const search = req.params.query
        const result = await generateQuery(queries.search, [`%${search}%`])
        res.send(result)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }


})




module.exports = app