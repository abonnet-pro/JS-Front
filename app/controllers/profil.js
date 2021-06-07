class ProfilController extends BaseController
{
    constructor()
    {
        super(true)
        this.displayProfilInformation()
    }

    async displayProfilInformation()
    {
        try
        {
            console.log("rentre")
            window.token = await this.model.refreshToken()
            sessionStorage.setItem("token", window.token)
            this.user = await this.model.getUserByLogin(indexController.login)
            this.roles = await this.model.getRoles(indexController.login)

            $("#labelLogin").innerText = this.user.login
            $("#labelName").innerText = this.user.displayname
            $("#labelSub").innerText = this.roles.find(role => role.role === "SUB") === undefined ? "Non Abonné" : "Abonné"
            $("#btn-subscribe").style.display = this.roles.find(role => role.role === "SUB") === undefined ? "block" : "none"
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

    edit()
    {
        $("#inputLoginUpdateUser").value = this.user.login
        $("#inputNameUpdateUser").value = this.user.displayname
        this.getModal("#updateUser").open()
        $("#inputNameUpdateUser").focus()
        $("#inputLoginUpdateUser").focus()
    }

    displayUpdatePassword()
    {
        if($("#checkUpdatePassword").checked)
        {
            $("#updatePasswordUser").style.display = "block"
            $("#confirmUpdatePasswordUser").style.display = "block"
        }
        else
        {
            $("#updatePasswordUser").style.display = "none"
            $("#confirmUpdatePasswordUser").style.display = "none"
            $("#inputPasswordUpdateUser").value = ""
            $("#inputConfirmPasswordUpdateUser").value = ""
        }
    }

    showPayement()
    {
        $("#titleRefusedPayment").style.display = "none"
        $("#inputPaymentCard").value = ""
        $("#inputinputPaymentName").value = ""
        $("#inputPaymentMonth").value = ""
        $("#inputPaymentYear").value = ""
        $("#inputPaymentCrypto").value = ""
        this.getModal("#modalSubscribe").open()
    }
}

window.profilController = new ProfilController()