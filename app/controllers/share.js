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
            if((await this.model.checkShareExist(idUserReceive, indexController.listId)).length !== 0)
            {
                this.displayShareInvalid()
                return
            }

            let selectedText = $("#userList").options[$("#userList").selectedIndex].text
            let modificationState = $("#modificationState").checked
            let share = new Share(idUserReceive, indexController.listId, modificationState)
            super.displayConfirmShare(selectedText, async () => {
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

        try
        {
            shares = await this.model.getShareSendByList(indexController.listId)

            if(shares.length !== 0)
            {
                $("#labelShare").style.display = "block"
                $("#shareTable").style.display = "block"
                $("#labelNoShare").style.display = "none"
            }

            for(let share of shares)
            {
                let useraccount = await this.model.getUser(share.iduserreceive)
                let modificationState = share.modification ? 'check' : 'close'
                let disabled = (indexController.login === useraccount.login || share.idusersend === (await this.model.getUserByLogin(indexController.login)).id) ? "" : "disabled"

                console.log(disabled)

                html += `<tr>
                        <td>${useraccount.displayname}</td>
                        <td>${useraccount.login}</td>
                        <td><i class="small material-icons">${modificationState}</i></td>
                        <td>
                            <button type="button" class="red darken-4 btn ${disabled}" onclick="shareController.displayConfirmDelete(${share.id})">
                            <i class="small material-icons">delete</i>
                            </button>
                        </td>
                     </tr>`
            }
            $("#shareBodyTable").innerHTML = html
            this.getModal("#modalListShare").open()
        }
        catch (e)
        {
            if(e === 401)
            {
                window.location.replace("login.html")
            }
            console.log(e)
            this.displayServiceError()
        }
    }

    async displayConfirmDelete(id)
    {
        try
        {
            const share = await this.model.getShare(id)
            const useraccount = await this.model.getUser(share.iduserreceive)
            super.displayConfirmDelete(share, async () => {
                switch (await this.model.deleteShare(id))
                {
                    case 200:
                        this.deletedShare = share
                        this.displayDeletedMessage("shareController.undoDelete()");
                        break
                    case 404:
                        this.displayNotFoundError();
                        break
                    case 500:
                        this.displayNotEmptyListError()
                        break
                    default:
                        this.displayServiceError()
                }
                if(indexController.login === useraccount.login)
                {
                    navigate("index")
                }
                else
                {
                    this.displayShareList()
                }
            })
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    undoDelete()
    {
        if (this.deletedShare)
        {
            this.model.insertShare(this.deletedShare).then(status => {
                if (status === 200)
                {
                    this.deletedShare = null
                    this.displayUndoDone()
                    this.displayShareList()
                    indexController.displayAllShareList()
                }
            }).catch(_ => this.displayServiceError())
        }
    }
}

window.shareController = new ShareController()