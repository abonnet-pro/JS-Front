const serviceBaseUrl = "http://localhost:3333/list"

class ListAPI
{
    getAllList()
    {
        return fetchJSON(serviceBaseUrl)
    }

    insert(list)
    {
        return fetch(serviceBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(list)
        })
    }
}