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