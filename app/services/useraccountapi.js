class UserAccountAPI extends BaseAPI
{
    constructor()
    {
        super("useraccount")
    }

    authenticate(login, password)
    {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        return new Promise((resolve, reject) => fetch(`${this.url}/authenticate`, {
            method: "POST",
            headers: this.headers,
            body: `login=${login}&password=${password}`
        }).then(res => {
            if (res.status === 200) {
                resolve(res.json())
            } else {
                reject(res.status)
            }
        }).catch(err => reject(err)))
    }

    insert(displayname, login, password)
    {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        return fetch(`${this.url}/create`, {
            method: "POST",
            headers: this.headers,
            body: `displayname=${displayname}&login=${login}&password=${password}`
        })
    }

    getUsersLikeLogin(login)
    {
        return fetchJSON(`${this.url}/${login}`, this.token)
    }
}
