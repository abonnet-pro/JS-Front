const serviceBaseUrl = "http://localhost:3333/list"

class ListAPI
{
    getAllList()
    {
        return fetchJSON(serviceBaseUrl)
    }
}