class Notificationapi extends BaseAPI
{
    constructor()
    {
        super("notification")
    }

    insert(notification)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(notification)
        })
    }

    getNotificationsByLogin(login)
    {
        return fetchJSON(`${this.url}/available/${login}`, window.token)
    }

    reloadNotification(notification)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(`${this.url}/reload`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(notification)
        })
    }

    updateNotification(notification)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(notification)
        })
    }
}