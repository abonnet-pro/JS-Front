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
            let content = ''
            let users = await this.model.getAllUsers()

            for(let user of users)
            {
                content += `<a onClick="" class="collection-item">${user.displayname} (${user.login})</a>`
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
                let users = await this.model.getUsersLikeLogin(login)
                if(users.length === 0)
                {
                    $("#collectionUsers").style.display = "none"
                }
                else
                {
                    $("#collectionUsers").style.display = "block"
                    for(let user of users)
                    {
                        content += `<a onClick="" class="collection-item">${user.displayname} (${user.login})</a>`
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
}

window.adminController = new AdminController()