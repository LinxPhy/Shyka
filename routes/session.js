const express = require('express')
const { createUID } = require('../scripts/generate_uid')
const { generateQuery } = require('../scripts/generateQuery')
const crypto = require('crypto')
const app = express()
app.set('trust proxy', true)

app.get('/api/session', async (req, res) => {
 
    try{

        const ip = req.ip
        const uid = req.params.uid || ''
        console.log(req.params)
        if (!ip) return res.sendStatus(400)
         
        if (verifyUID(uid, ip)) return res.sendStatus(200)

        const { uid : new_uid, signature } = await createUID()
        const query = 'INSERT INTO sessions (user_id, signature, ip_address) VALUES (?, ?, ?)'
        await generateQuery(query, [new_uid.uid, signature, ip])

        res.send(new_uid.uid)

    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
    
})

async function verifyUID( uid, ip ) {

    try {
        const query = 'SELECT signature, ip_address FROM sessions WHERE user_id = ?'
        const result = await generateQuery(query, [uid])
        const hash = crypto.createHmac('sha256', process.env.UID_SECRET).update(uid).digest('hex')
        const data = result[0] || ''

        if ( !data  || data.ip_address !== ip  || hash !== data.signature ) return false
        
        return true

    } catch(e) {
        console.log(e)
        return false
    }
}



module.exports = app