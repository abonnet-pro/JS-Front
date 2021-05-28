class RoleAPI extends BaseAPI
{
    constructor()
    {
        super("role")
    }

    getRoles(login)
    {
        return fetchJSON(`${this.url}/roles/${login}`, window.token)
    }

    insert(role)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(role)
        })
    }

    delete(id)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.delete('Content-Type')
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: header })
    }
}
