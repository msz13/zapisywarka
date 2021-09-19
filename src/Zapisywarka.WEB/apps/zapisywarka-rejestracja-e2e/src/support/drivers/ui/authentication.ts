
export class AuthenticationDriver {
    
    
    typeLoginData(login: string, password: string, rememberMe: boolean = false) {
         
         cy.get('[data-test=login]').type(login)

         cy.get('[data-test=password]').type(password)

         if(rememberMe) {
             cy.get('[data-test]=remember-me').click()
         }
    }
    
    login() {

        cy.get('[data-test=login-button]').click()
    }

}