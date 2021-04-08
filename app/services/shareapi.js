class ShareAPI extends BaseAPI
{
    constructor()
    {
        super("share")
    }

    insert(share)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(share)
        })
    }

    getShareSendByList(id)
    {
        return fetchJSON(`${this.url}/send/${id}`, window.token)
    }

    getShareReceive()
    {
        return fetchJSON(this.url, window.token)
    }

    delete(id)
    {
        const header = new Headers()
        header.append("Authorization", `Bearer ${window.token}`)
        header.delete('Content-Type')
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: header })
    }

    get(id)
    {
        return fetchJSON(`${this.url}/${id}`, window.token)
    }

    checkShareExist(idreceive, idlist)
    {
        return fetchJSON(`${this.url}/check/${idreceive}/${idlist}`, window.token)
    }
}