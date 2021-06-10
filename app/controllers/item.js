class ItemController extends BaseController
{
    constructor()
    {
        super(true)
        this.displayAllItem()
        if(indexController.modification === false)
        {
            $("#nav-add").style.display = 'none'
            $("#nav-end").style.display = 'none'
        }
        if(indexController.displayName) $("#itemDisplayName").innerText = indexController.displayName
    }

    async displayAllItem()
    {
        try
        {
            window.token = await this.model.refreshToken()
            sessionStorage.setItem("token", window.token)
            let content = ""
            const list = await this.model.getList(indexController.listId)
            const items = await this.model.getAllItemByList(list.id)
            $("#itemTitle").innerHTML = `<i class="material-icons">navigate_before</i>Liste du ${list.date.toLocaleDateString()}`

            if(items.length > 0)
            {
                $("#titleNoItem").style.display = "none"
            }
            else
            {
                $("#titleNoItem").style.display = "block"
            }


            for(let item of items)
            {
                let checked = item.checked ? "checked" : ""
                let disabled = (indexController.modification === false) ? "disabled" : ""
                content += `<tr>
                                <td>
                                    <label>
                                    <input type="checkbox" ${disabled} onchange="itemController.updateCheck(${item.id})" ${checked}/>
                                    <span></span>
                                    </label>
                                </td>
                                <td class="font-custom">${item.label}</td>
                                <td class="font-custom">${item.quantity}</td>
                                <td>
                                    <button type="button" class="red lighten-2 btn ${disabled}" onclick="itemController.displayConfirmDelete(${item.id})">
                                    <i class="small material-icons">delete</i>
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn ${disabled} orange lighten-2" onclick="itemController.edit(${item.id})">
                                    <i class="small material-icons">edit</i>
                                    </button>
                                </td>
                            </tr>`
            }
            $('#itemBodyTable').innerHTML = content
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

    async updateCheck(id)
    {
        try
        {
            const item = await this.model.getItem(id)
            item.checked = !item.checked
            await this.model.updateItem(item)
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
            const item = await this.model.getItem(id)
                super.displayConfirmDelete(item, async () => {
                switch (await this.model.deleteItem(id))
                {
                    case 200:
                        this.deletedItem = item
                        this.displayDeletedMessage("itemController.undoDelete()");
                        break
                    case 404:
                        this.displayNotFoundError();
                        break
                    case 500:
                        this.displayNotEmptyListError()
                        break
                    case 401:
                        window.location.replace("login.html")
                        break
                    default:
                        this.displayServiceError()
                }
                this.displayAllItem()
            })
        }
        catch(e)
        {
            if(e === 401)
            {
                window.location.replace("login.html")
            }
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
            if(err === 401)
            {
                window.location.replace("login.html")
            }
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

    undoDelete()
    {
        if (this.deletedItem)
        {
            this.model.insertItem(this.deletedItem).then(status => {
                if (status === 200)
                {
                    this.deletedItem = null
                    this.displayUndoDone()
                    this.displayAllItem()
                }
            }).catch(_ => this.displayServiceError())
        }
    }
}

window.itemController = new ItemController()
