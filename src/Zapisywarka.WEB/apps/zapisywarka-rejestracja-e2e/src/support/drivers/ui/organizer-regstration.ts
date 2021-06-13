import {getPassword, getPasswordConfirmation, getSignUpButton, getUserName, getAccessCode, getNextButton} from "../../sign-up-form.po"

export class OrganiserSignUpDriver {

    signUp() {
        getSignUpButton().click()
        
    }

    enterRegistrationData(userName: string, password: string, passwordConfirmation: string) {
        
        getUserName().type(userName)
        getPassword().type(password)
        getPasswordConfirmation().type(passwordConfirmation)


    }
    enterAccessCode(accesCode: any) {
        getAccessCode().type(accesCode)
        getNextButton().click()
        
    }

}


