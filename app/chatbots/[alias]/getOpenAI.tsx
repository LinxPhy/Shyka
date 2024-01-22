

async function getOpenAI(messages: any) {

    let response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ messages })
    })

    if (!response.ok) return
    
    return response

}

export default getOpenAI