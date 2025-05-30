const crypto = require('crypto')
const { generateQuery } = require('./generateQuery')

async function createUID() {
    
    const checkUIDExists = async (uidToCheck) => {
        const query = 'SELECT user_id FROM users WHERE user_id = ?'
        const result = await generateQuery(query, [uidToCheck])
        return result.length > 0
    };

    const createID = async (attempt = 0) => {
        if (attempt > 3) {
            throw new Error('Max attempts reached');
        }

        const uid = 'uid' + generateUID();
        const signature = crypto.createHmac('sha256', process.env.UID_SECRET).update(uid).digest('hex');

        if (await checkUIDExists(uid)) {
            return await createID(attempt + 1);
        } else {
            return { uid, signature };
        }
    };

    createID();
}


function generateUID(length = 32) {
    let result = '';
    while (result.length < length) {
        result += Math.random().toString(36).substring(2);
    }
    return result.substring(0, length);
}



module.exports = { createUID }