import {getLoginButton, getRememberMe, getServerError, getUserName, getPassword} from '../../../../../../libs/identity/utills/src/lib/test/login.po'



export class AuthenticationDriver {
    
    
    typeLoginData(login: string, password: string, rememberMe: boolean = false) {
         
         getUserName().type(login)

         getPassword().type(password)

         if(rememberMe) {
             getRememberMe().click()
         }
    }
    
    login() {

        getLoginButton().click()
    }

    getServerError() {
        return getServerError()
    }

}