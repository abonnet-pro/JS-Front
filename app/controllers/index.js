class IndexController extends BaseController
{
    constructor()
    {
        super(true)
        this.tableAllList = $('#tableAllList')
        this.tableBodyAllList = $('#tableBodyAllList')
        this.tableAllListShare = $("#tableAllListShare")
        this.tableBodyAllListShare = $("#tableBodyAllListShare")
        this.formEditList = $('#formEditList')
        this.formUpdateList = $("#formUpdateList")
        this.formUpdateShareList = $("#formUpdateShareList")
        this.btnAddList = $("#btnAddList")
        this.login = sessionStorage.getItem("login")
        this.displayAllList()
        this.displayAllShareList()
    }

    async displayAllList()
    {
        let content = ''
        this.tableAllList.style.display = "none"
        this.formEditList.style.display = "none"
        this.formUpdateList.style.display = "none"
        this.btnAddList.style.display = "block"

        try {
            window.token = await this.model.refreshToken()
            sessionStorage.setItem("token", window.token)
            for (const list of await this.model.getAllList())
            {
                const date = list.date.toLocaleDateString()
                content += `<tr>
                                <td><a class="btn transparent black-text" onclick="indexController.navigateItemList('${list.id}')">${list.shop}</a></td>
                                <td>${date}</td>
                                <td class="icon">
                                    <a class="btn tooltipped" data-position="bottom" data-tooltip="Supprimer" onclick="indexController.displayConfirmDelete(${list.id})"><i class="material-icons">delete</i></a>
                                    <button class="btn" onclick="indexController.edit(${list.id})"><i class="material-icons">edit</i></button>
                                    <button class="btn" onclick="indexController.displayConfirmArchive(${list.id})"><i class="material-icons">archive</i></button>
                                    <button class="btn" onclick="indexController.displaySearchShare(${list.id})"><i class="material-icons">share</i></button>
                                </td>
                            </tr>`
            }
            this.tableBodyAllList.innerHTML = content
            this.tableAllList.style.display = "block"
        } catch (err) {
            if(err === 401)
            {
                window.location.replace("login.html")
            }
            console.log(err)
            this.displayServiceError()
        }
    }

    async displayAllShareList()
    {
        let content = ''
        this.tableAllListShare.style.display = "none"
        this.formUpdateShareList.style.display = "none"

        try
        {
            for(const share of await this.model.getShareReceive())
            {
                const list = await this.model.getList(share.idlist)
                const user = await this.model.getUser(list.iduser)
                const date = list.date.toLocaleDateString()
                const disabled = share.modification ? "" : "disabled"

                content += `<tr>
                                <td><a class="btn transparent black-text" onclick="indexController.navigateItemList(${list.id}, ${share.modification}, '${user.displayname}')">${list.shop}</a></td>
                                <td>${date}</td>
                                <td class="icon">
                                    <a class="btn tooltipped ${disabled}" data-position="bottom" data-tooltip="Supprimer" onclick="indexController.displayConfirmDelete(${list.id})"><i class="material-icons">delete</i></a>
                                    <button class="btn ${disabled}" onclick="indexController.editShare(${list.id})"><i class="material-icons">edit</i></button>
                                    <button class="btn ${disabled}" onclick="indexController.displayConfirmArchive(${list.id})"><i class="material-icons">archive</i></button>
                                </td>
                            </tr>`
            }

            this.tableBodyAllListShare.innerHTML = content
            this.tableAllListShare.style.display = "block"
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    navigateItemList(listId, modification, displayName)
    {
        this.listId = listId
        this.modification = modification
        this.displayName = displayName
        navigate("item")
    }

    async editShare(id)
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
            this.showShareForm()
            this.selectedList = object
            $("#inputUpdateShareShop").value = this.selectedList.shop
            $("#inputUpdateShareDate").value = this.selectedList.date.toISOString().substr(0, 10)
            $("#inputUpdateShareShop").focus()
        }
        catch (err)
        {
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

    async displayConfirmArchive(id)
    {
        try
        {
            const list = await this.model.getList(id)
            list.archived = true
            super.displayConfirmArchive(list, async () => {
                switch (await this.model.update(list))
                {
                    case 200:
                        this.displayArchivedMessage();
                        navigate("index")
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
                this.displayAllShareList()
            })
        }
        catch (e) {
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

    displaySearchShare(listId)
    {
        this.listId = listId
        $("#inputLoginShare").value = null
        $("#inputLoginShare").style.backgroundColor = ""
        $("#modificationState").checked = false
        $("#userList").innerHTML = null
        $("#userList").disabled = true
        this.getModal("#formShareList").open()
    }

    showEditForm()
    {
        this.formUpdateList.style.display = "block"
        this.formEditList.style.display = "none"
        this.btnAddList.style.display = "none"
    }

    showForm()
    {
        $("#inputShopList").style.backgroundColor = ""
        $("#inputDateList").style.backgroundColor = ""
        this.formEditList.style.display = "block"
        this.formUpdateList.style.display = "none"
        this.btnAddList.style.display = "none"
    }

    showShareForm()
    {
        $("#inputUpdateShareShop").style.backgroundColor = ""
        $("#inputUpdateShareDate").style.backgroundColor = ""
        $("#inputUpdateShareShop").value = ""
        $("#inputUpdateShareDate").value = ""
        $("#formUpdateShareList").style.display = "block"
    }

    closeShareForm()
    {
        $("#formUpdateShareList").style.display = "none"
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

    showHistory()
    {
        navigate("history")
    }
}

window.indexController = new IndexController()
