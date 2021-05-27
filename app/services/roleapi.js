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
}
