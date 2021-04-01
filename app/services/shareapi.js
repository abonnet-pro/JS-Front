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

}