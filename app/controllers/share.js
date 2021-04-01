class ShareController extends BaseController
{
    constructor()
    {
        super(true)
    }

    async shareList()
    {
        let idUserReceive = $("#userList").value
        if(idUserReceive === '')
        {
            this.displayShareLoginInvalid()
            return
        }

        try
        {
            let share = new Share(idUserReceive, indexController.listId, false)
            super.displayConfirmShare($("#userList").textContent, async () => {
                if(await this.model.insertShare(share) === 200)
                {
                    this.toast("Partage effectué")
                    this.getModal("#formShareList").close()
                }
                else
                {
                    this.displayServiceError()
                }
            })
        }
        catch (e)
        {
            console.log(e)
            this.displayServiceError()
        }
    }
}

window.shareController = new ShareController()