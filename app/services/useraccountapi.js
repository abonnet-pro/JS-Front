class UserAccountAPI extends BaseAPI
{
    constructor()
    {
        super("useraccount")
    }

    authenticate(login, password)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set('Content-Type', 'application/x-www-form-urlencoded')
        return new Promise((resolve, reject) => fetch(`${this.url}/authenticate`, {
            method: "POST",
            headers: header,
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
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set('Content-Type', 'application/x-www-form-urlencoded')
        return fetch(`${this.url}/create`, {
            method: "POST",
            headers: header,
            body: `displayname=${displayname}&login=${login}&password=${password}`
        })
    }

    sendConfirmationEmail(login)
    {
        return fetchJSON(`${this.url}/mail/${login}`)
    }

    resetPassword(login)
    {
        return fetchJSON(`${this.url}/resetPassword/${login}`)
    }

    getUsersLikeLogin(login)
    {
        return fetchJSON(`${this.url}/${login}`, window.token)
    }

    getUserByResetCode(code)
    {
        return fetchJSON(`${this.url}/resetCode/${code}`)
    }

    get(id)
    {
        return fetchJSON(`${this.url}/id/${id}`, window.token)
    }

    refreshToken()
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)

        return new Promise((resolve, reject) => fetch(`${this.url}/token`, {
            method: "POST",
            headers: header,
        }).then(res => {
            if (res.status === 200) {
                resolve(res.json())
            } else {
                reject(res.status)
            }
        }).catch(err => reject(err)))
    }

    update(user)
    {
        const header = new Headers()
        header.set( 'Content-Type', 'application/json' )
        return fetch(`${this.url}/reset`, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(user)
        })
    }
}
