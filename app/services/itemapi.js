class ItemAPI extends BaseAPI
{
    constructor()
    {
        super("item")
    }

    getAllItemByList(id)
    {
        return fetchJSON(`${this.url}/list/${id}`, window.token)
    }

    insert(item)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(item)
        })
    }

    get(id)
    {
        return fetchJSON(`${this.url}/${id}`, window.token)
    }

    delete(id)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.delete('Content-Type')
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: header })
    }

    update(item)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(item)
        })
    }
}