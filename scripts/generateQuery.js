const { connection } = require('./db')

async function generateQuery(query, data ) {

    const result = await new Promise((resolve, reject) => {
        connection.query(query, data, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })

    return result

}

module.exports = {generateQuery}