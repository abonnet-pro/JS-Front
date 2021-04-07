class Model
{
    constructor()
    {
        this.listAPI = new ListAPI()
        this.itemAPI = new ItemAPI()
        this.userAccountAPI = new UserAccountAPI()
        this.shareAPI = new ShareAPI()
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

    async getAllShareList()
    {
        let lists = []
        for (let list of await this.listAPI.getAllShareList())
        {
            list.date = new Date(list.date)
            lists.push(Object.assign(new List(), list))
        }
        return lists
    }

    async getUsersLikeLogin(login)
    {
        let users = []
        for(let user of await this.userAccountAPI.getUsersLikeLogin(login))
        {
            users.push(Object.assign(new UserAccount(), user))
        }
        return users
    }

    async getShareSendByList(id)
    {
        let shares = []
        for(let share of await this.shareAPI.getShareSendByList(id))
        {
            shares.push(Object.assign(new Share(), share))
        }
        return shares
    }

    insert(list)
    {
        return this.listAPI.insert(list).then(res => res.status)
    }

    insertItem(item)
    {
        return this.itemAPI.insert(item).then(res => res.status)
    }

    insertUser(displayName, login, password)
    {
        return this.userAccountAPI.insert(displayName, login, password).then(res => res.status)
    }

    insertShare(share)
    {
        return this.shareAPI.insert(share).then(res => res.status)
    }

    delete(id)
    {
        return this.listAPI.delete(id).then(res => res.status)
    }

    deleteItem(id)
    {
        return this.itemAPI.delete(id).then(res => res.status)
    }

    deleteShare(id)
    {
        return this.shareAPI.delete(id).then(res => res.status)
    }

    update(list)
    {
        return this.listAPI.update(list).then(res => res.status)
    }

    updateItem(item)
    {
        return this.itemAPI.update(item).then(res => res.status)
    }

    async checkShareExist(idreceive, idlist)
    {
        try
        {
            let shares = []
            for (let share of await this.shareAPI.checkShareExist(idreceive, idlist))
            {
                shares.push(Object.assign(new Share(), share))
            }
            return shares
        }
        catch (e)
        {
            if (e === 404) return null
            return undefined
        }
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

    async getUser(id)
    {
        try
        {
            const user = Object.assign(new UserAccount(), await this.userAccountAPI.get(id))
            return user
        }
        catch (e)
        {
            if (e === 404) return null
            return undefined
        }
    }

    async getShare(id)
    {
        try
        {
            const share = Object.assign(new Share(), await this.shareAPI.get(id))
            return share
        }
        catch (e)
        {
            if (e === 404) return null
            return undefined
        }
    }
}