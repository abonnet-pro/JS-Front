class Model {
    constructor() {
        this.listAPI = new ListAPI()
    }

    async getAllList()
    {
        let lists = []
        for (let list of await this.listAPI.getAllList())
        {
            list.date = new Date(list.date)
            lists.push(Object.assign(new List(), list))
        }
        return lists
    }
}