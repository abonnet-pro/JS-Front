class BaseFormController extends BaseController {

    constructor() {
        super()
    }

    validateRequiredField(selector, name)
    {
        $(selector).style.backgroundColor = null
        const value =  $(selector).value
        if ((value == null) || (value === ""))
        {
            this.toast(`Le champs '${name}' est obligatoire`)
            $(selector).style.backgroundColor = 'antiquewhite'
            return null
        }
        return value
    }

    clearField(selector)
    {
        $(selector).value = ""
    }
}
