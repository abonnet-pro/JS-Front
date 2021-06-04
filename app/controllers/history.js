class HistoryController extends BaseController {
    constructor() {
        super(true)
        this.displayHistoryList()
    }

    async displayItem(id)
    {
        let html = ""
        const items = await this.model.getAllItemByList(id)

        for(let item of items)
        {
            let checked = item.checked ? "check" : "clear"
            html += `<strong><i class="tiny material-icons">${checked}</i> ${item.quantity} ${item.label}</strong><br>`
        }

        return html
    }

    async displayHistoryList()
    {
        try
        {
            window.token = await this.model.refreshToken()
            sessionStorage.setItem("token", window.token)
            const historyLists = await this.model.getAllArchivedList()
            let html = ""
            for(let historyList of historyLists)
            {
                html +=`<div class="post-it">
                        <a class="btn-floating history" onclick="historyController.displayConfirmDelete(${historyList.id})"><i class="material-icons">clear</i></a>
                        <div class="card-content black-text">
                            <span class="card-title">${historyList.shop} \n ${historyList.date.toLocaleDateString()}</span>
                            <br>
                            <br>
                            ${await this.displayItem(historyList.id)}
                        </div>
                    </div>`
            }
            $('#historyList').innerHTML = html
        }
        catch (e) {
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
            const list = await this.model.getList(id)
            super.displayConfirmDelete(list, async () => {
                switch (await this.model.delete(id))
                {
                    case 200:
                        this.toast( `<span>Supression effectuée</span>`)
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
                this.displayHistoryList()
            })
        } catch (err) {
            if(err === 401)
            {
                window.location.replace("login.html")
            }
            console.log(err)
            this.displayServiceError()
        }
    }
}

window.historyController = new HistoryController()