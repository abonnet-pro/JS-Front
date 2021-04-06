class BaseController
{
    constructor(secured)
    {
        if (secured) { this.checkAuthentication() }
        M.AutoInit();
        this.setBackButtonView('index')
        this.model = new Model()
    }

    checkAuthentication()
    {
        if (sessionStorage.getItem("token") === null)
        {
            window.location.replace("login.html")
        }
    }

    toast(msg)
    {
        M.toast({html: msg, classes: 'rounded'})
    }

    displayServiceError()
    {
        this.toast('Service injoignable ou problème réseau')
    }

    getModal(selector)
    {
        return M.Modal.getInstance($(selector))
    }

    setBackButtonView(view)
    {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }

    displayConfirmShare(userreceive, onClick)
    {
        $('#spanShareObject').innerText = userreceive.toString()
        $('#btnShare').onclick = onClick
        this.getModal('#modalConfirmShare').open()
    }

    displayConfirmArchive(object, onClick)
    {
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
        $('#spanArchiveObject').innerText = object.toString()
        $('#btnArchive').onclick = onClick
        this.getModal('#modalConfirmArchive').open()
    }

    displayConfirmDelete(object, onclick)
    {
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
        $('#spanDeleteObject').innerText = object.toString()
        $('#btnDelete').onclick = onclick
        this.getModal('#modalConfirmDelete').open()
    }

    displayLoginInvalid()
    {
        this.toast('Inscription impossible : login non disponible')
        $("#inputLogin").style.backgroundColor = 'antiquewhite'
    }

    displayNotFoundError()
    {
        this.toast('Entité inexistante')
    }

    displayNotEmptyListError()
    {
        this.toast('Impossible : La liste contient des ingrédients')
    }

    displayDeletedMessage(onUndo)
    {
        this.toast( `<span>Supression effectuée</span><button class="btn-flat toast-action" onclick="${onUndo}">Annuler</button>`)
    }

    displayInscriptionMessage()
    {
        this.toast("Inscription validé veuillez vous connecter")
    }

    displayArchivedMessage()
    {
        this.toast( `<span>Archive effectuée</span>`)
    }

    displayUndoDone()
    {
        this.toast('Opération annulée')
    }

    displayShareLoginInvalid()
    {
        this.toast("Veuillez selectionner un login dans la liste déroulante")
    }

    displayShareInvalid()
    {
        this.toast("Cette liste a déjà été partagé avec cet utilisateur")
    }
}
