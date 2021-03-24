class IndexController extends BaseController
{
    constructor()
    {
        super()
        this.tableAllList = $('#tableAllList')
        this.tableBodyAllList = $('#tableBodyAllList')
        this.formEditList = $('#formEditList')
        this.formUpdateList = $("#formUpdateList")
        this.btnAddList = $("#btnAddList")
        this.displayAllList()
    }

    async displayAllList()
    {
        let content = ''
        this.tableAllList.style.display = "none"
        this.formEditList.style.display = "none"
        this.formUpdateList.style.display = "none"
        this.btnAddList.style.display = "block"

        try {
            for (const list of await this.model.getAllList()) {
                const date = list.date.toLocaleDateString()
                content += `<tr>
                                <td>${list.shop}</td>
                                <td>${date}</td>
                                <td class="icon">
                                    <button class="btn" onclick="indexController.displayConfirmDelete(${list.id})"><i class="material-icons">delete</i></button>
                                    <button class="btn" onclick="indexController.edit(${list.id})"><i class="material-icons">edit</i></button>
                                </td>
                            </tr>`
            }
            this.tableBodyAllList.innerHTML = content
            this.tableAllList.style.display = "block"
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async edit(id)
    {
        try
        {
            const object = await this.model.getList(id)
            if (object === undefined)
            {
                this.displayServiceError()
                return
            }
            if (object === null)
            {
                this.displayNotFoundError()
                return
            }
            this.showEditForm()
            this.selectedList = object
            $("#inputUpdateShop").value = this.selectedList.shop
            $("#inputUpdateDate").value = this.selectedList.date.toISOString().substr(0, 10)
            $("#inputUpdateShop").focus()
        }
        catch (err)
        {
            console.log(err)
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
                        this.deletedList = list
                        this.displayDeletedMessage("indexController.undoDelete()");
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
                this.displayAllList()
            })
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    showEditForm()
    {
        this.formUpdateList.style.display = "block"
        this.formEditList.style.display = "none"
        this.btnAddList.style.display = "none"
    }

    showForm()
    {
        this.formEditList.style.display = "block"
        this.formUpdateList.style.display = "none"
        this.btnAddList.style.display = "none"
    }

    closeForms()
    {
        this.formEditList.style.display = "none"
        this.formUpdateList.style.display = "none"
        this.btnAddList.style.display = "block"
    }

    undoDelete()
    {
        if (this.deletedList)
        {
            this.model.insert(this.deletedList).then(status => {
                if (status === 200)
                {
                    this.deletedList = null
                    this.displayUndoDone()
                    this.displayAllList()
                }
            }).catch(_ => this.displayServiceError())
        }
    }
}

window.indexController = new IndexController()
