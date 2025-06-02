const express = require('express')
const { generateQuery } = require('../scripts/generateQuery')
const OpenAI = require("openai");
const app = express()

const openai = new OpenAI();


app.get('/api/logs/:alias', async (req, res) => {

    try {
        const alias = req.params.alias
        const uid = req.query.uid
        const query = 'SELECT * FROM logs WHERE alias = ? ORDER BY created_at DESC'
        const result = await generateQuery(query, [alias])
        res.send(result)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})


app.post('/api/completion', async (req, res) => {

    try {
        const { logs, alias } = req.body

        const dev_message = await getChatbotMessage(alias)

        const filteredLogs = logs.reverse().map(({ role, content }) => ({ role, content }))
        filteredLogs.unshift(dev_message) 
        
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            stream: true,
            messages: filteredLogs,
            temperature: 0.9,
            max_completion_tokens: 300,
        })

        let fullResponse = ""

        for await (const chunk of response) {
            if (chunk.choices[0].delta.content) {
                let content = chunk.choices[0].delta.content
                fullResponse = fullResponse + chunk.choices[0].delta.content;
                res.write(content)
            }
        }

        filteredLogs.shift()
        res.end()
        return

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

})

async function getChatbotMessage(alias) {

    const query = 'SELECT chatbotMessage FROM chatbots WHERE alias = ?'
    const result = await generateQuery(query, [alias])

    const systemMessage = {
        role: "developer",
        content: result[0]?.chatbotMessage
    }

    return systemMessage

}

app.post('/api/save_message', async (req, res) => {

    try {
        const { assistantMessage, userMessage, alias, user_id } = req.body

        const query = 'INSERT INTO logs (user_id, alias, role, content) VALUES (?, ?, ?, ?), (?, ?, ?, ?)'
        await generateQuery(query, [user_id, alias, "assistant", assistantMessage, user_id, alias, "user", userMessage])
        res.sendStatus(200)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }


})

module.exports = app