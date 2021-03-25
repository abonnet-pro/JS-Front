const serviceBaseItemUrl = "http://localhost:3333/item"

class ItemAPI
{
    getAllItemByList(id)
    {
        return fetchJSON(`${serviceBaseItemUrl}/list/${id}`)
    }

    insert(item)
    {
        return fetch(serviceBaseItemUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
    }

    get(id)
    {
        return fetchJSON(`${serviceBaseItemUrl}/${id}`)
    }

    delete(id)
    {
        return fetch(`${serviceBaseItemUrl}/${id}`, { method: 'DELETE' })
    }

    update(item)
    {
        return fetch(serviceBaseItemUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
    }
}