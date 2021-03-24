class EditController extends BaseFormController {
    constructor() {
        super()
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
}

window.editController = new EditController()