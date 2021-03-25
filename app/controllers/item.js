class ItemController extends BaseController
{
    constructor()
    {
        super()
        this.displayAllItem()
    }

    async displayAllItem()
    {
        try
        {
            let content = ""
            const list = await this.model.getList(indexController.listId)
            const items = await this.model.getAllItemByList(list.id)
            $("#itemTitle").innerText = `Liste du ${list.date.toLocaleDateString()}`

            for(let item of items)
            {
                let checked = item.checked ? "checked" : ""
                content += `<tr>
                        <td>
                            <label>
                            <input type="checkbox" onchange="" ${checked}"/>
                            <span></span>
                            </label>
                        </td>
                        <td>${item.label}</td>
                        <td>${item.quantity}</td>
                        <td>
                            <button type="button" class="red darken-4 btn" onclick="">
                            <i class="small material-icons">delete</i>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn" onclick="itemController.edit(${item.id})">
                            <i class="small material-icons">edit</i>
                            </button>
                        </td>
                     </tr>`
            }
            $('#itemBodyTable').innerHTML = content
        }
        catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }

    async edit(id)
    {
        try
        {
            const object = await this.model.getItem(id)
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
            this.selectedItem = object
            $("#inputLabelUpdateItem").value = this.selectedItem.label
            $("#inputQuantityUpdateItem").value = this.selectedItem.quantity
            this.getModal("#updateItem").open()
            $("#inputQuantityUpdateItem").focus()
            $("#inputLabelUpdateItem").focus()
        }
        catch (err)
        {
            console.log(err)
            this.displayServiceError()
        }
    }

    newItem()
    {
        $("#inputLabelItem").value = ""
        $("#inputQuantityItem").value = ""
        $("#inputLabelItem").style.backgroundColor = ""
        $("#inputQuantityItem").style.backgroundColor = ""
        this.getModal("#addItem").open()
    }
}

window.itemController = new ItemController()
