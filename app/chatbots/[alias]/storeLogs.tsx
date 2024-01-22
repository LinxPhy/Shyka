

async function storeData({ fingerprint, alias, role, content }: any) {

    let response = await fetch('/api/db/storeLogs', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ fingerprint, alias, role, content })
    })

    if (!response.ok) return


}

export default storeData