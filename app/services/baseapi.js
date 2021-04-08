const serviceBaseUrl = "http://localhost:3333"
window.token = ""

class BaseAPI
{
    constructor(url)
    {
        this.url = `${serviceBaseUrl}/${url}`
        window.token = sessionStorage.getItem("token")
    }
}