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

    get(id)
    {
        return fetchJSON(`${serviceBaseUrl}/${id}`)
    }

    delete(id)
    {
        return fetch(`${serviceBaseUrl}/${id}`, { method: 'DELETE' })
    }

    update(list)
    {
        return fetch(serviceBaseUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(list)
        })
    }
}