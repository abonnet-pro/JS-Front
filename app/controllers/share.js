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

    async displayShareList()
    {
        let html = ''
        let shares = []
        shares = await this.model.getShareSendByList(indexController.listId)
        console.log(shares)
        if(shares.length !== 0)
        {
            $("#labelShare").style.display = "block"
            $("#shareTable").style.display = "block"
            $("#labelNoShare").style.display = "none"
        }

        for(let share of shares)
        {
            let useraccount = await this.model.getUser(share.iduserreceive)
            html += `<tr>
                        <td>${useraccount.displayname}</td>
                        <td>${useraccount.login}</td>
                        <td>
                            <button type="button" class="red darken-4 btn" onclick="">
                            <i class="small material-icons">delete</i>
                            </button>
                        </td>
                     </tr>`
        }
        $("#shareBodyTable").innerHTML = html
        this.getModal("#modalListShare").open()
    }
}

window.shareController = new ShareController()