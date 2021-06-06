import {getPassword, getPasswordConfirmation, getSignUpButton, getUserName, getAccessCode} from "@zapisywarka-client-aps/sign-up/utils"

export class OrganiserRegistrationDriver {

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
        
    }

}


