class Model {
    constructor() {
        this.listAPI = new ListAPI()
        this.itemAPI = new ItemAPI()
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

    async getAllArchivedList()
    {
        let lists = []
        for (let list of await this.listAPI.getAllArchivedList())
        {
            list.date = new Date(list.date)
            lists.push(Object.assign(new List(), list))
        }
        return lists
    }

    async getAllItemByList(id)
    {
        let items = []
        for (let item of await this.itemAPI.getAllItemByList(id))
        {
            items.push(Object.assign(new Item(), item))
        }
        return items
    }

    insert(list)
    {
        return this.listAPI.insert(list).then(res => res.status)
    }

    insertItem(item)
    {
        return this.itemAPI.insert(item).then(res => res.status)
    }

    delete(id)
    {
        return this.listAPI.delete(id).then(res => res.status)
    }

    deleteItem(id)
    {
        return this.itemAPI.delete(id).then(res => res.status)
    }

    update(list)
    {
        return this.listAPI.update(list).then(res => res.status)
    }

    updateItem(item)
    {
        return this.itemAPI.update(item).then(res => res.status)
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

    async getItem(id)
    {
        try
        {
            const item = Object.assign(new Item(), await this.itemAPI.get(id))
            return item
        }
        catch (e)
        {
            if (e === 404) return null
            return undefined
        }
    }
}