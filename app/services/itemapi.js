class ItemAPI extends BaseAPI
{
    constructor()
    {
        super("item")
    }

    getAllItemByList(id)
    {
        return fetchJSON(`${this.url}/list/${id}`, this.token)
    }

    insert(item)
    {
        this.headers.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(item)
        })
    }

    get(id)
    {
        return fetchJSON(`${this.url}/${id}`, this.token)
    }

    delete(id)
    {
        this.headers.delete('Content-Type')
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: this.headers })
    }

    update(item)
    {
        this.headers.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(item)
        })
    }
}