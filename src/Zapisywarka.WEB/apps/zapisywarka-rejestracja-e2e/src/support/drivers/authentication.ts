
export class AuthenticationDriver {
    
    
    typeLoginData(login: string, password: string) {
         
         cy.get('[data-test=login]').type(login)

         cy.get('[data-test=password]').type(password)
    }
    
    login() {

        cy.get('[data-test=login-button]').click()
    }

}