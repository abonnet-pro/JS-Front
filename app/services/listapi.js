const serviceBaseListUrl = "http://localhost:3333/list"

class ListAPI
{
    getAllList()
    {
        return fetchJSON(serviceBaseListUrl)
    }

    getAllArchivedList()
    {
        return fetchJSON(`${serviceBaseListUrl}/archived`)
    }

    insert(list)
    {
        return fetch(serviceBaseListUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(list)
        })
    }

    get(id)
    {
        return fetchJSON(`${serviceBaseListUrl}/${id}`)
    }

    delete(id)
    {
        return fetch(`${serviceBaseListUrl}/${id}`, { method: 'DELETE' })
    }

    update(list)
    {
        return fetch(serviceBaseListUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(list)
        })
    }
}