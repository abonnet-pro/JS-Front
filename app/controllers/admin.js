class AdminController extends BaseController
{
    constructor()
    {
        super(true)
        this.displayAllUsers()
    }

    async displayAllUsers()
    {
        try
        {
            $("#labelNoUsersFound").style.display = "none"
            let content = ''
            let users = await this.model.getAllUsers()

            if(users.length === 0)
            {
                $("#labelNoUsersFound").style.display = "block"
            }

            for(let user of users)
            {
                content += `<a onclick="adminController.edit(${user.id})" class="collection-item">${user.displayname} (${user.login})</a>`
            }

            $("#collectionUsers").innerHTML = content
        }
        catch(e)
        {
            console.log(e)
            this.displayServiceError()
        }
    }

    async displaySearchUsers()
    {
        let login = $("#inputLoginSearch").value
        let content = ''

        if(login != null)
        {
            try
            {
                $("#labelNoUsersFound").style.display = "none"
                let users = await this.model.getUsersLikeLogin(login)
                if(users.length === 0)
                {
                    $("#collectionUsers").style.display = "none"
                    $("#labelNoUsersFound").style.display = "block"
                }
                else
                {
                    $("#collectionUsers").style.display = "block"
                    for(let user of users)
                    {
                        content += `<a onclick="adminController.edit(${user.id})" class="collection-item">${user.displayname} (${user.login})</a>`
                    }
                    $("#collectionUsers").innerHTML = content
                }
            }
            catch (e)
            {
                console.log(e)
                this.displayServiceError()
            }
        }
        else
        {
            await this.displayAllUsers()
        }
    }

    async edit(id)
    {
        try
        {
            const user = await this.model.getUser(id)
            this.user = user
            const roles = await this.model.getRoles(user.login)
            $("#selectUser").selected = false
            $("#selectAdmin").selected = false

            for(let role of roles)
            {
                switch(role.role)
                {
                    case 'ADMIN' :
                        $("#selectAdmin").selected = true
                        break;
                    case 'USER' :
                        $("#selectUser").selected = true
                        break;
                }
            }

            $("#inputLoginUpdateUserAdmin").value = user.login
            $("#inputNameUpdateUserAdmin").value = user.displayname
            this.getModal("#updateUserAdmin").open()
            $("#inputNameUpdateUserAdmin").focus()
            $("#inputLoginUpdateUserAdmin").focus()
        }
        catch(e)
        {
            console.log(e)
            this.displayServiceError()
        }
    }

    confirmSendEmail()
    {
        $("#spanSpendEmail").innerText = this.user.login
        this.getModal("#modalConfirmMailAdmin").open()
    }

    async sendEmail()
    {
        try
        {
            await this.model.resetPassword(this.user.login)
            this.toast("email envoyé")
        }
        catch(e)
        {
            console.log(e)
            this.displayServiceError()
        }
    }
}


window.adminController = new AdminController()