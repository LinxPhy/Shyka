const Logs = require('@/app/schema/LogsSchema')
const User = require('@/app/schema/UserSchema')

async function storeLogs({ props }: any) {

    let response = await fetch('http://localhost:3000/api/db', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ props })
    })

    return;

}



export default storeLogs