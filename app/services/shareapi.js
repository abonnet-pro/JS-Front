class ShareAPI extends BaseAPI
{
    constructor()
    {
        super("share")
    }

    insert(share)
    {
        this.headers.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(share)
        })
    }

    getShareSendByList(id)
    {
        return fetchJSON(`${this.url}/send/${id}`, this.token)
    }

    delete(id)
    {
        this.headers.delete('Content-Type')
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: this.headers })
    }

    get(id)
    {
        return fetchJSON(`${this.url}/${id}`, this.token)
    }

    checkShareExist(idreceive, idlist)
    {
        return fetchJSON(`${this.url}/check/${idreceive}/${idlist}`, this.token)
    }
}