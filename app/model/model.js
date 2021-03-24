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

    insert(list)
    {
        return this.listAPI.insert(list).then(res => res.status)
    }

    delete(id)
    {
        return this.listAPI.delete(id).then(res => res.status)
    }

    update(list)
    {
        return this.listAPI.update(list).then(res => res.status)
    }

    async getList(id)
    {
        try
        {
            const list = Object.assign(new List(), await this.listAPI.get(id))
            list.date = new Date(list.date)
            return list
        }
        catch (e)
        {
            if (e === 404) return null
            return undefined
        }
    }


}