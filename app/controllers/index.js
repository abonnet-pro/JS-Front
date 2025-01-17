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
        this.checkRoles()
        this.checkNotification()
    }

    async displayAllList()
    {
        let content = ''
        this.formEditList.style.display = "none"
        this.formUpdateList.style.display = "none"
        this.btnAddList.style.display = "block"

        try
        {
            window.token = await this.model.refreshToken()
            sessionStorage.setItem("token", window.token)
            const allList = await this.model.getAllList()

            if(allList.length > 0)
            {
                $("#divMyList").style.display = "block"
                $("#titleNoList").style.display = "none"
            }
            else
            {
                $("#divMyList").style.display = "none"
                $("#titleNoList").style.display = "block"
            }

            for (const list of allList)
            {
                const date = list.date.toLocaleDateString()
                content += `<tr>
                                <td><a class="btn transparent white-text light-blue darken-2" onclick="indexController.navigateItemList('${list.id}')">${list.shop}</a></td>
                                <td>${date}</td>
                                <td class="icon">
                                    <a class="btn tooltipped red lighten-2" data-position="bottom" data-tooltip="Supprimer" onclick="indexController.displayConfirmDelete(${list.id})"><i class="material-icons">delete</i></a>
                                    <button class="btn orange lighten-2" onclick="indexController.edit(${list.id})"><i class="material-icons">edit</i></button>
                                    <button class="btn blue-grey lighten-2" onclick="indexController.displayConfirmArchive(${list.id})"><i class="material-icons">archive</i></button>
                                    <button class="btn light-blue lighten-2" onclick="indexController.displaySearchShare(${list.id})"><i class="material-icons">share</i></button>
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
            const shareList = await this.model.getShareReceive()

            if(shareList.length > 0)
            {
                $("#divListShare").style.display = "block"
                $("#titleNoShareList").style.display = "none"
            }
            else
            {
                $("#divListShare").style.display = "none"
                $("#titleNoShareList").style.display = "block"
            }

            for(const share of shareList)
            {
                const list = await this.model.getList(share.idlist)
                const user = await this.model.getUser(list.iduser)
                const date = list.date.toLocaleDateString()
                const disabled = share.modification ? "" : "disabled"

                content += `<tr>
                                <td><a class="btn transparent white-text light-blue darken-2" onclick="indexController.navigateItemList(${list.id}, ${share.modification}, '${user.displayname}')">${list.shop}</a></td>
                                <td>${date}</td>
                                <td class="icon">
                                    <a class="btn tooltipped ${disabled} red lighten-2" data-position="bottom" data-tooltip="Supprimer" onclick="indexController.displayConfirmDelete(${list.id})"><i class="material-icons">delete</i></a>
                                    <button class="btn ${disabled} orange lighten-2" onclick="indexController.editShare(${list.id})"><i class="material-icons">edit</i></button>
                                    <button class="btn ${disabled} blue-grey lighten-2" onclick="indexController.displayConfirmArchive(${list.id})"><i class="material-icons">archive</i></button>
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
            if(err === 401)
            {
                window.location.replace("login.html")
            }
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
            if(err === 401)
            {
                window.location.replace("login.html")
            }
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
            if(e === 401)
            {
                window.location.replace("login.html")
            }
            console.log(e)
            this.displayServiceError()
        }
    }

    async deleteShares(shares)
    {
        try
        {
            for(let share of shares)
            {
                await this.model.deleteShare(share.id)
            }
        }
        catch(e)
        {
            console.log(e)
            this.displayServiceError()
        }
    }

    async displayConfirmDelete(id)
    {
        try
        {
            const list = await this.model.getList(id)
            const shares = await this.model.getShareSendByList(list.id)
            super.displayConfirmDelete(list, async () => {
                switch (await this.model.delete(id))
                {
                    case 200:
                        this.deletedList = list
                        await this.deleteShares(shares)
                        this.displayDeletedMessage("indexController.undoDelete()");
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
                this.displayAllList()
                this.displayAllShareList()
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

    displaySearchShare(listId)
    {
        if(this.roles.find(role => role.role === "SUB") === undefined)
        {
            this.toast("Veuillez souscrire à l'abonnement pour plus de fonctionnalités")
            return
        }

        this.listId = listId
        $("#inputLoginShare").value = null
        $("#inputLoginShare").style.backgroundColor = ""
        $("#modificationState").checked = false
        $("#userList").innerHTML = null
        $("#userList").disabled = true
        $("#loginNotFound").style.display = "none"
        this.getModal("#formShareList").open()
    }

    showEditForm()
    {
        this.formUpdateList.style.display = "block"
        this.formEditList.style.display = "none"
        this.btnAddList.style.display = "none"
    }

    async showForm()
    {
        const lists = await this.model.getAllList()
        if(lists.length >= 1 && this.roles.find(role => role.role === "SUB") === undefined)
        {
            this.toast("Veuillez souscrire à l'abonnement pour plus de fonctionnalités")
            return
        }

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

    showProfil()
    {
        navigate("profil")
    }

    showAdmin()
    {
        navigate("admin")
    }

    async checkRoles()
    {
        this.roles = await this.model.getRoles(this.login)

        for(let role of this.roles)
        {
            if(role.role === "ADMIN")
            {
                $("#nav-admin").style.display = "block"
            }
        }
    }

    async checkNotification()
    {
        try
        {
            const notifications = await this.model.getNotificationsByLogin(this.login)
            if(notifications.length > 0)
            {
                $("#buttonNumberNotifications").style.display = "block"
                $("#spanNumberNotifications").innerText = notifications.length
            }
            else
            {
                $("#buttonNumberNotifications").style.display = "none"
            }

        }
        catch(e)
        {
            if(e === 401)
            {
                window.location.replace("login.html")
            }
            console.log(e)
        }
    }

    async showNotifications()
    {
        try
        {
            $("#btnNotificationPrevious").className = "btn-flat right disabled"
            $("#btnNotificationNext").className = "btn-flat right"
            this.notifications = await this.model.getNotificationsByLogin(this.login)
            this.currentNotification = 0

            if(this.notifications.length === 0)
            {
                this.getModal("#modalNotification").close()
                return
            }

            if(this.currentNotification === this.notifications.length - 1)
            {
                $("#btnNotificationNext").className = "btn-flat right disabled"
            }

            $("#cardTitle").innerText = this.notifications[this.currentNotification].title
            $("#cardMessage").innerText = this.notifications[this.currentNotification].message
            $("#cardDate").innerText = `reçue le : ${(this.notifications[this.currentNotification].date).toLocaleDateString()}`
            this.getModal("#modalNotification").open()
        }
        catch(e)
        {
            if(e === 401)
            {
                window.location.replace("login.html")
            }
            console.log(e)
        }
    }

    nextNotification()
    {
        this.currentNotification += 1
        $("#btnNotificationPrevious").className = "btn-flat right"
        if(this.currentNotification === this.notifications.length - 1)
        {
            $("#btnNotificationNext").className = "btn-flat right disabled"
        }
        $("#cardTitle").innerText = this.notifications[this.currentNotification].title
        $("#cardMessage").innerText = this.notifications[this.currentNotification].message
        $("#cardDate").innerText = `reçue le : ${(this.notifications[this.currentNotification].date).toLocaleDateString()}`
    }

    previousNotification()
    {
        this.currentNotification -= 1
        $("#btnNotificationNext").className = "btn-flat right"
        if(this.currentNotification === 0)
        {
            $("#btnNotificationPrevious").className = "btn-flat right disabled"
        }
        $("#cardTitle").innerText = this.notifications[this.currentNotification].title
        $("#cardMessage").innerText = this.notifications[this.currentNotification].message
        $("#cardDate").innerText = `reçue le : ${(this.notifications[this.currentNotification].date).toLocaleDateString()}`
    }

    async removeNotification()
    {
        try
        {
            this.notifications[this.currentNotification].read = true
            switch (await this.model.updateNotification(this.notifications[this.currentNotification]))
            {
                case 200:
                    this.showNotifications()
                    this.checkNotification()
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
            $("#checkReadNotification").checked = false
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

    checkBankPayment()
    {
        /* Verifie le paiement auprés de la banque, retourne vrai si le paiement a été effectué correctement */
        return true
    }
}

window.indexController = new IndexController()
