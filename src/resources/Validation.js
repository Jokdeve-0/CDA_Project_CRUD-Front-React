class Validations {
    validateName = (name) => {
        const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
        return re.test(String(name).toLowerCase());
    }
    //---------------------------------------------------//
    validateEmail = (email) => {
        const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        return re.test(String(email).toLowerCase());
    }
    //---------------------------------------------------//
    validatePass = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return re.test(String(password));
    }
    //---------------------------------------------------//
    validateMessage = (message) => {
        const re = /[a-zA-Z0-9_!?÷+=@#$%ˆ&*()~;:][^¡¿\\{}|``<>[\]]{0,}$/
        return re.test(String(message));
    }
    //---------------------------------------------------//
    create_elements_errors() {
        const errorsElements = []
        const elements = [
            ['error-pseudo', 'Le pseudo est invalide!'],
            ['error-email', 'L\'email est invalide!'],
            ['error-password', 'Le password est invalide!'],
            ['error-confPassword', 'Le nouveau password est invalide!'],
            ['error-comment', 'Le commentaire est invalide!'],
            ['error-password', 'Le password est incorrect!']
        ]
        elements.forEach(infoElm => {
            var p = document.createElement("p")
            p.setAttribute("id", infoElm[0])
            p.setAttribute("class", "w-100 m-auto")
            p.innerHTML = infoElm[1]
            errorsElements.push(p)
        })
        return errorsElements
    }
    //---------------------------------------------------//
    remove_validations_errors() {
        const elements = ['error-pseudo', 'error-email', 'error-password', 'error-confPassword', 'error-comment']
        elements.forEach(elm => {
            if (document.getElementById(elm)) {
                document.getElementById(elm).remove()
            }
        })
    }
    //---------------------------------------------------//

    validation_login() {
        this.remove_validations_errors()
        const email = this.validations_email()
        const password = this.validations_password()
        if (!email || !password) {
            return false
        }
        return {
            email: document.getElementById('Email').value,
            password: document.getElementById('Password').value
        }
    }
    //---------------------------------------------------//
    validation_article() {
        var smsNotOk = true

        this.remove_validations_errors()

        if (document.getElementById('genre').value === "Sélectionnez une catégorie") {
            smsNotOk = 'Veuillez sélectionner une catégorie'
        }

        if (!this.validateMessage(document.getElementById('message').value)) {
            smsNotOk = 'Le message n\'est pas valide! <br> Il ne doit pas contenir ¡¿{}|``<>[]'
            if (document.getElementById('message').value === "") {
                smsNotOk = 'Vous devez ajouter un message'
            }
        }
        if (smsNotOk !== true) {
            var p = document.createElement("p")
            p.setAttribute("id", "error-message")
            p.innerHTML = smsNotOk
            document.getElementById('message').before(p)
            return false
        }
        return smsNotOk

    }
    //---------------------------------------------------//

    validations_pseudo() {
        this.remove_validations_errors()
        const errorsElements = this.create_elements_errors()
        const Pseudo_elment = document.getElementById("Pseudo")
        if (Pseudo_elment.value === "" || !this.validateName(Pseudo_elment.value)) {
            Pseudo_elment.before(errorsElements[0])
            return false
        }
        return {
            pseudo: Pseudo_elment.value
        }
    }
    //---------------------------------------------------//
    validations_email() {
        this.remove_validations_errors()
        const errorsElements = this.create_elements_errors()
        const Email_elment = document.getElementById("Email")
        if (Email_elment.value === "" || !this.validateEmail(Email_elment.value)) {
            Email_elment.before(errorsElements[1])
            return false
        }
        return {
            email: Email_elment.value
        }
    }
    //---------------------------------------------------//
    validations_password() {
        this.remove_validations_errors()
        const errorsElements = this.create_elements_errors()
        const Pass_element = document.getElementById("Password")
        if (Pass_element.value === "" || !this.validatePass(Pass_element.value)) {
            Pass_element.before(errorsElements[2])
            return false
        }
        return {
            password: Pass_element.value
        }
    }
    //---------------------------------------------------//
    validations_confPassword() {
        this.remove_validations_errors()
        const errorsElements = this.create_elements_errors()
        const Pass_element = document.getElementById("confPassword")
        if (Pass_element.value === "" || !this.validatePass(Pass_element.value)) {
            Pass_element.before(errorsElements[3])
            return false
        }
        return {
            confPassword: Pass_element.value
        }
    }
    error_password() {
        this.remove_validations_errors()
        const errorsElements = this.create_elements_errors()
        const Pass_element = document.getElementById("Password")
        Pass_element.before(errorsElements[5])
        return false 
    }
    //---------------------------------------------------//
    validations_comment(inputId) {
        this.remove_validations_errors()
        const errorsElements = this.create_elements_errors()
        const comment_element = document.getElementById(inputId)
        if (comment_element.value === "" || !this.validateMessage(comment_element.value)) {
            comment_element.before(errorsElements[4])
            return false
        }
        return {
            comment: comment_element.value
        }
    }
    //---------------------------------------------------//
    validations_control() {
        const pseudo = this.validations_pseudo()
        const email = this.validations_email()
        const password = this.validations_password()
        if (!pseudo || !email || !password) {
            return false
        } else {
            return {
                pseudo: pseudo.pseudo,
                email: email.email,
                password: password.password
            }
        }
    }
    //---------------------------------------------------//
}
const validations = new Validations()
module.exports = validations;