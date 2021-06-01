class EditController extends BaseFormController
{
    constructor()
    {
        super(true)
    }

    async updateList()
    {
        let shop = this.validateRequiredField('#inputUpdateShop', 'Magasin')
        let date = this.validateRequiredField("#inputUpdateDate", 'Date')

        if((shop != null) && (date != null))
        {
            const dateList = new Date(date)
            indexController.selectedList.shop = shop
            indexController.selectedList.date = dateList
            try
            {
                if (await this.model.update(indexController.selectedList) === 200)
                {
                    this.toast("La liste a bien été modifé")
                    this.clearField('#inputShopList')
                    this.clearField('#inputDateList')
                    indexController.selectedList = null
                    await indexController.displayAllList()
                }
                else
                {
                    this.displayServiceError()
                }
            }
            catch(err)
            {
                console.log(err)
                this.displayServiceError()
            }
        }
    }

    async updateShareList()
    {
        let shop = this.validateRequiredField('#inputUpdateShareShop', 'Magasin')
        let date = this.validateRequiredField("#inputUpdateShareDate", 'Date')

        if((shop != null) && (date != null))
        {
            const dateList = new Date(date)
            indexController.selectedList.shop = shop
            indexController.selectedList.date = dateList
            try
            {
                if (await this.model.update(indexController.selectedList) === 200)
                {
                    this.toast("La liste a bien été modifé")
                    this.clearField('#inputUpdateShareShop')
                    this.clearField('#inputUpdateShareDate')
                    indexController.selectedList = null
                    await indexController.displayAllShareList()
                }
                else
                {
                    this.displayServiceError()
                }
            }
            catch(err)
            {
                console.log(err)
                this.displayServiceError()
            }
        }
    }

    async saveList()
    {
        let shop = this.validateRequiredField('#inputShopList', 'Magasin')
        let date = this.validateRequiredField("#inputDateList", 'Date')

        if((shop != null) && (date != null))
        {
            const dateList = new Date(date)

            try
            {
                switch(await this.model.insert(new List(shop, dateList)))
                {
                    case 200:
                        this.toast("La liste a bien été inséré")
                        this.clearField('#inputShopList')
                        this.clearField('#inputDateList')
                        await indexController.displayAllList()
                        break
                    case 401:
                            window.location.replace("login.html")
                            break
                    default:
                        this.displayServiceError()
                        break
                }
            }
            catch(err)
            {
                console.log(err)
                this.displayServiceError()
            }
        }
    }

    async saveItem()
    {
        let label = this.validateRequiredField('#inputLabelItem', 'Nom')
        let quantity = this.validateRequiredField("#inputQuantityItem", 'Quantité')

        if(!$("#inputQuantityItem").validity.valid)
        {
            this.displayItemNumberError()
            return
        }


        if((label != null) && (quantity != null))
        {
            try
            {
                switch(await this.model.insertItem(new Item(indexController.listId, label, quantity)))
                {
                    case 200:
                        this.toast("L'ingrédient a bien été inséré")
                        this.clearField('#inputLabelItem')
                        this.clearField('#inputQuantityItem')
                        await itemController.displayAllItem()
                        this.getModal("#addItem").close()
                        break
                    case 401:
                            window.location.replace("login.html")
                        break
                    default:
                        this.displayServiceError()
                        break
                }
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
    }

    async updateItem()
    {
        let label = this.validateRequiredField('#inputLabelUpdateItem', 'Nom')
        let quantity = this.validateRequiredField("#inputQuantityUpdateItem", 'Quantité')

        if((label != null) && (quantity != null))
        {
            itemController.selectedItem.label = label
            itemController.selectedItem.quantity = quantity
            try
            {
                switch(await this.model.updateItem(itemController.selectedItem))
                {
                    case 200:
                        this.toast("L'ingrédient a bien été modifé")
                        this.clearField('#inputLabelUpdateItem')
                        this.clearField('#inputQuantityUpdateItem')
                        itemController.selectedItem = null
                        this.getModal("#updateItem").close()
                        await itemController.displayAllItem()
                        break
                    case 401:
                        window.location.replace("login.html")
                        break
                    default:
                        this.displayServiceError()
                        break
                }
            }
            catch(err)
            {
                if(err === 401)
                {
                    window.location.replace("login.html")
                }
                console.log(err)
                this.displayServiceError()
            }
        }
    }

    async displayAvailableLogin()
    {
        let login = this.validateRequiredField('#inputLoginShare', 'Login')
        let html = ''

        if(login != null)
        {
            try
            {
                let users = await this.model.getUsersLikeLoginForShare(login)
                if(users.length === 0)
                {
                    $("#loginNotFound").style.display = "block"
                    $("#userList").disabled = true
                }
                else
                {
                    $("#loginNotFound").style.display = "none"
                    $("#userList").disabled = false
                }

                for(let user of users)
                {
                    html += `<option value="${user.id}">${user.toString()}</option>`
                }
                $("#userList").innerHTML = html
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
    }

    async updateUser()
    {
        let login = this.validateRequiredField('#inputLoginUpdateUser', 'Login')
        let name = this.validateRequiredField("#inputNameUpdateUser", 'Nom d\'utilisateur')
        let challenge

        if($("#checkUpdatePassword").checked)
        {
            if($("#inputConfirmPasswordUpdateUser").value !== $("#inputPasswordUpdateUser").value)
            {
                this.toast("les mots de passe ne sont pas identiques")
                return
            }

            challenge = this.validateRequiredField('#inputPasswordUpdateUser', 'Mot de passe')
            if(challenge == null) return
            profilController.user.challenge = challenge
        }

        profilController.user.login = login
        profilController.user.displayname = name

        if((login != null) && (name != null))
        {
            try
            {
                switch (await this.model.updateProfil(profilController.user))
                {
                    case 200:
                        this.toast("Votre profil a bien été modifé")
                        this.clearField('#inputLoginUpdateUser')
                        this.clearField('#inputNameUpdateUser')
                        this.getModal("#updateUser").close()
                        await profilController.displayProfilInformation()
                        break
                    case 401:
                            window.location.replace("login.html")
                        break
                    default:
                        this.displayServiceError()
                        break
                }
            }
            catch(err)
            {
                if(err === 401)
                {
                    window.location.replace("login.html")
                }
                console.log(err)
                this.displayServiceError()
            }
        }
    }

    async updateUserAdmin()
    {
        let login = this.validateRequiredField('#inputLoginUpdateUserAdmin', 'Login')
        let name = this.validateRequiredField("#inputNameUpdateUserAdmin", 'Nom d\'utilisateur')
        let selectedRoles = M.FormSelect.getInstance($("#selectRoles")).getSelectedValues()

        if(selectedRoles.length === 0)
        {
            this.toast("Veuillez selectionner au moins un role")
            return
        }

        adminController.user.login = login
        adminController.user.displayname = name
        adminController.user.active = $("#checkActiveAccount").checked

        if((login != null) && (name != null))
        {
            try
            {
                if (await this.model.updateProfil(adminController.user) === 200)
                {
                    await this.model.deleteUserRoles(adminController.user.id)
                    for(let role of selectedRoles)
                    {
                        await this.model.insertRole(new Role(adminController.user.id, role))
                    }

                    this.toast("Le profil a bien été modifé")
                    this.clearField('#inputLoginUpdateUserAdmin')
                    this.clearField('#inputNameUpdateUserAdmin')
                    this.getModal("#updateUserAdmin").close()
                    await adminController.displaySearchUsers()
                }
                else
                {
                    this.displayServiceError()
                }
            }
            catch(err)
            {
                console.log(err)
                this.displayServiceError()
            }
        }
    }
}

window.editController = new EditController()