class IndexController extends BaseController
{
    constructor()
    {
        super()
        this.tableAllList = $('#tableAllList')
        this.tableBodyAllList = $('#tableBodyAllList')
        this.displayAllList()
    }

    async displayAllList()
    {
        let content = ''
        this.tableAllList.style.display = "none"
        try {
            for (const list of await this.model.getAllList()) {
                const date = list.date.toLocaleDateString()
                content += `<tr>
                                <td>${list.shop}</td>
                                <td>${date}</td>
                            </tr>`
            }
            this.tableBodyAllList.innerHTML = content
            this.tableAllList.style.display = "block"
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}

window.indexController = new IndexController()
