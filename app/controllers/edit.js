class EditController extends BaseFormController
{
    constructor()
    {
        super(true)
    }

    async updateList()
    {
        let shop = this.validateRequiredField('#inputUpdateShop', 'Magasin')
        let date = this.validateRequiredField("#inputUpdateDate", 'Date')

        if((shop != null) && (date != null))
        {
            const dateList = new Date(date)
            indexController.selectedList.shop = shop
            indexController.selectedList.date = dateList
            try
            {
                if (await this.model.update(indexController.selectedList) === 200)
                {
                    this.toast("La liste a bien été modifé")
                    this.clearField('#inputShopList')
                    this.clearField('#inputDateList')
                    indexController.selectedList = null
                    await indexController.displayAllList()
                }
                else
                {
                    this.displayServiceError()
                }
            }
            catch(err)
            {
                console.log(err)
                this.displayServiceError()
            }
        }
    }

    async saveList()
    {
        let shop = this.validateRequiredField('#inputShopList', 'Magasin')
        let date = this.validateRequiredField("#inputDateList", 'Date')

        if((shop != null) && (date != null))
        {
            const dateList = new Date(date)

            try
            {
                if(await this.model.insert(new List(shop, dateList)) === 200)
                {
                    this.toast("La liste a bien été inséré")
                    this.clearField('#inputShopList')
                    this.clearField('#inputDateList')
                    await indexController.displayAllList()
                }
                else
                {
                    this.displayServiceError()
                }
            }
            catch(err)
            {
                console.log(err)
                this.displayServiceError()
            }
        }
    }

    async saveItem()
    {
        let label = this.validateRequiredField('#inputLabelItem', 'Nom')
        let quantity = this.validateRequiredField("#inputQuantityItem", 'Quantité')

        if((label != null) && (quantity != null))
        {
            try
            {
                if(await this.model.insertItem(new Item(indexController.listId, label, quantity)) === 200)
                {
                    this.toast("L'ingrédient' a bien été inséré")
                    this.clearField('#inputLabelItem')
                    this.clearField('#inputQuantityItem')
                    await itemController.displayAllItem()
                    this.getModal("#addItem").close()
                }
                else
                {
                    this.displayServiceError()
                }
            }
            catch (e)
            {
                console.log(e)
                this.displayServiceError()
            }
        }
    }

    async updateItem()
    {
        let label = this.validateRequiredField('#inputLabelUpdateItem', 'Nom')
        let quantity = this.validateRequiredField("#inputQuantityUpdateItem", 'Quantité')

        if((label != null) && (quantity != null))
        {
            itemController.selectedItem.label = label
            itemController.selectedItem.quantity = quantity
            try
            {
                if (await this.model.updateItem(itemController.selectedItem) === 200)
                {
                    this.toast("L'ingrédient a bien été modifé")
                    this.clearField('#inputLabelUpdateItem')
                    this.clearField('#inputQuantityUpdateItem')
                    itemController.selectedItem = null
                    this.getModal("#updateItem").close()
                    await itemController.displayAllItem()
                }
                else
                {
                    this.displayServiceError()
                }
            }
            catch(err)
            {
                console.log(err)
                this.displayServiceError()
            }
        }
    }
}

window.editController = new EditController()