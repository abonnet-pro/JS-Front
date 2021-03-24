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