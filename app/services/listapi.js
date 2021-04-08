class ListAPI extends BaseAPI
{
    constructor()
    {
        super("list")
    }

    getAllList()
    {
        return fetchJSON(this.url, window.token)
    }

    getAllArchivedList()
    {
        return fetchJSON(`${this.url}/archived`, window.token)
    }

    getAllShareList()
    {
        return fetchJSON(`${this.url}/share`, window.token)
    }

    insert(list)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(list)
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
        this.headers.delete('Content-Type')
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers : header })
    }

    update(list)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(list)
        })
    }
}