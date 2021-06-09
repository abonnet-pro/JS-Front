const serviceBaseUrl = "http://ec2-54-164-198-238.compute-1.amazonaws.com:3333"
window.token = ""

class BaseAPI
{
    constructor(url)
    {
        this.url = `${serviceBaseUrl}/${url}`
        window.token = sessionStorage.getItem("token")
    }
}