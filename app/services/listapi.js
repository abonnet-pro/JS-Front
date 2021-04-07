class ListAPI extends BaseAPI
{
    constructor()
    {
        super("list")
    }

    getAllList()
    {
        return fetchJSON(this.url, this.token)
    }

    getAllArchivedList()
    {
        return fetchJSON(`${this.url}/archived`, this.token)
    }

    getAllShareList()
    {
        return fetchJSON(`${this.url}/share`, this.token)
    }

    insert(list)
    {
        this.headers.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(list)
        })
    }

    get(id)
    {
        return fetchJSON(`${this.url}/${id}`, this.token)
    }

    delete(id)
    {
        this.headers.delete('Content-Type')
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers : this.headers })
    }

    update(list)
    {
        this.headers.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(list)
        })
    }
}