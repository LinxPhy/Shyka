

async function verifyUID({ uid, signature }) {

    const hash = crypto.createHmac('sha256', process.env.UID_SECRET).update(uid).digest('hex')
    return hash === signature

}

module.exports = { verifyUID }