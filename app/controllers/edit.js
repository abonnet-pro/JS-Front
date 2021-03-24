class EditController extends BaseFormController {
    constructor() {
        super()
    }

    async saveList() {

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