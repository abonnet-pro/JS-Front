class LoginController extends BaseFormController
{
    constructor()
    {
        super(false)
        this.svc = new UserAccountAPI()
    }

    deconnexion()
    {
        sessionStorage.setItem("token", null)
        window.location.replace("login.html")
    }

    displayInscription()
    {
        $("#inputDisplayName").value = ""
        $("#inputLogin").value = ""
        $("#inputPassword").value = ""
        $("#inputDisplayName").style.backgroundColor = ""
        $("#inputLogin").style.backgroundColor = ""
        $("#inputPassword").style.backgroundColor = ""
        this.getModal("#addUser").open()
    }

    async saveUser()
    {
        let displayName = this.validateRequiredField("#inputDisplayName", "Nom d'utilisateur")
        let login = this.validateRequiredField("#inputLogin", "Login")
        let password = this.validateRequiredField("#inputPassword", "Mot de passe")
        if((displayName != null) && (login != null) && (password != null))
        {
            if(!$("#inputLogin").validity.valid)
            {
                this.displayLoginError()
                return
            }

            switch(await this.model.insertUser(displayName, login, password))
            {
                case 200:
                    $("#fieldLogin").value = login
                    this.getModal("#addUser").close()
                    $("#labelNoConfirmEmail").style.display = "block"
                    this.displayInscriptionMessage()
                    await this.sendConfirmationMail()
                    break
                case 406:
                    this.displayLoginInvalid();
                    break
                default:
                    this.displayServiceError()
            }
        }
    }

    async authenticate()
    {
        let login = this.validateRequiredField('#fieldLogin', 'Adresse e-mail')
        let password = this.validateRequiredField('#fieldPassword', 'Mot de passe')
        if ((login != null) && (password != null))
        {
            this.svc.authenticate(login, password)
                .then(res => {
                    sessionStorage.setItem("token", res.token)
                    sessionStorage.setItem("login", login)
                    window.token = sessionStorage.getItem("token")
                    window.location.replace("index.html")
                })
                .catch(err => {
                    console.log(err)
                    if (err === 401)
                    {
                        this.toast("Adresse e-mail ou mot de passe incorrect")
                    }
                    else if(err === 403)
                    {
                        $("#labelNoConfirmEmail").style.display = "block"
                    }
                    else
                    {
                        this.displayServiceError()
                    }
                })
        }
    }

    async sendConfirmationMail()
    {
        try
        {
            await this.model.sendConfirmationEmail($("#fieldLogin").value)
            this.toast("email envoyé")
        }
        catch (e)
        {
            console.log(e.toString())
            this.displayServiceError()
        }
    }
}

window.loginController = new LoginController()
