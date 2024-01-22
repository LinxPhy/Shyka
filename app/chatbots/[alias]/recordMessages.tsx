



async function recordResponses(props : any) {

    const alias = props.alias

    const response = await fetch('/api/db/recordResponses', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ alias: alias})
    })

    if (!response.ok) return

    return response

}

export default recordResponses