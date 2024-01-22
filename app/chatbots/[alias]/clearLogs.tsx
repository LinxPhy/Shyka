

async function clearLogs(props : any) {

    const fingerprint = props.fingerprint
    const alias = props.alias

    const response = await fetch('/api/db/removeLogs', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ fingerprint: fingerprint, alias: alias})
    })

    if (!response.ok) return

    return response

}

export default clearLogs