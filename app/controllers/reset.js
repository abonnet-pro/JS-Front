class ResetController extends BaseFormController
{
    constructor()
    {
        super(false)
        this.svc = new UserAccountAPI()
        this.getParamUrl()
    }

    async getParamUrl()
    {
        try
        {
            this.resetCode = window.location.search.substr(1)
            this.user = await this.model.getUserByResetCode(this.resetCode)

            if(this.user === null || this.getMinutsDifference(new Date(this.user.resetdate)) > 30)
            {
                $("#divReset").style.display = "none"
                $("#labelReset").innerText = "Votre lien à expiré, veuillez en demander un nouveau"
            }

            $("#labelLoginReset").innerText += ` ${this.user.login}`
        }
        catch(e)
        {
            console.log(e)
            this.displayServiceError()
        }
    }

    getMinutsDifference(date)
    {
        const milliseconds = new Date().getTime() - date.getTime()
        const seconds = milliseconds / 1000
        return Math.trunc(seconds / 60)
    }

    async resetPassword()
    {
        let password = this.validateRequiredField("#inputNewPassword", "Mot de passe")
        let confirm = this.validateRequiredField("#inputNewPasswordConfirm", "Confirmer")

        if(password !== confirm)
        {
            this.toast("Les mots de passe ne sont pas identiques !")
            return
        }

        if(password != null && confirm != null)
        {
            try
            {
                this.user.challenge = password
                if(await this.model.updateUser(this.user) === 200)
                {
                    $("#divReset").style.display = "none"
                    $("#labelReset").innerText = "Votre mot de passe a bien été modifié"
                }
                else
                {
                    this.displayServiceError()
                }
            }
            catch(e)
            {
                console.log(e)
                this.displayServiceError()
            }
        }
    }
}

window.resetController = new ResetController()