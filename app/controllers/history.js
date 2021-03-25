class HistoryController extends BaseController {
    constructor() {
        super()
        this.displayHistoryList()
    }

    async displayItem(id)
    {
        let html = ""
        const items = await this.model.getAllItemByList(id)

        for(let item of items)
        {
            let checked = item.checked ? "check" : "clear"
            html += `<p><i class="tiny material-icons">${checked}</i> ${item.quantity} ${item.label}</p>`
        }

        return html
    }

    async displayHistoryList()
    {
        try
        {
            const historyLists = await this.model.getAllArchivedList()
            let html = ""
            for(let historyList of historyLists)
            {
                html +=`<div class="card blue-grey darken-1">
                        <a class="btn-floating red darken-4 right" onclick=""><i class="material-icons">clear</i></a>
                        <div class="card-content white-text">
                            <span class="card-title">${historyList.shop} \n ${historyList.date.toLocaleDateString()}</span>
                            ${await this.displayItem(historyList.id)}
                        </div>
                    </div>`
            }
            $('#historyList').innerHTML = html
        }
        catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }
}

window.historyController = new HistoryController()