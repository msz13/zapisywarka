
export class RestOrganiserSignUpDriver {
    
   
    accessCode: string = ""
    userName: string = ""
    password: string =""

    signUp() {
        
        
    }

    enterRegistrationData(userName: string, password: string, passwordConfirmation: string) {
        
      this.userName= userName
      this.password = password
    }

    enterAccessCode(accesCode: any) {
        
     this.accessCode = accesCode
        
    }

    getOrganisers() {
      cy.wait('@createUser')
      return cy.request('GET','/api/identity/users').its('body')
  }

  createUser(token: string, Nazwa_uzytkownika: any, password: string) {
    cy.request('POST', '/api/identity/users', {
      accessCode: token,
      userName: Nazwa_uzytkownika,
      password: password
    }).its('status').should('to.equal', 204)
  }
  
  
}
