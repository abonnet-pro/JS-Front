class List
{
    constructor(shop, date)
    {
        this.id = null
        this.shop = shop
        this.date = date
        this.archived = false
    }

    toString()
    {
        return `${this.shop} (${this.date.toLocaleDateString()}) `
    }
}

class Item
{
    constructor(idlist, label, quantity)
    {
        this.idlist = idlist
        this.id = null
        this.label = label
        this.quantity = quantity
        this.checked = false
    }

    toString()
    {
        return this.label
    }
}

class UserAccount
{
    constructor(displayname, login)
    {
        this.id = null
        this.displayname = displayname
        this.displayname = login
        this.challenge = null
    }

    toString()
    {
        return (`${this.displayname} (${this.login})`)
    }
}

class Share
{
    constructor(iduserreceive, idlist, modification)
    {
        this.id = null
        this.idusersend = null
        this.iduserreceive = iduserreceive
        this.idlist = idlist
        this.modification = modification
    }

    toString()
    {
        return `le partage`
    }
}