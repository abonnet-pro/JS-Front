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
           switch(await this.model.insertUser(displayName, login, password))
           {
               case 200:
                   this.displayInscriptionMessage();
                   $("#fieldLogin").value = login
                   this.getModal("#addUser").close()
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
                    window.location.replace("index.html")
                })
                .catch(err => {
                    console.log(err)
                    if (err === 401)
                    {
                        this.toast("Adresse e-mail ou mot de passe incorrect")
                    }
                    else
                    {
                        this.displayServiceError()
                    }
                })
        }
    }
}

window.loginController = new LoginController()
