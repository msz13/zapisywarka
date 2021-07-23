
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
      return cy.request('GET','/api/identity/users').its('body')
  }

  createUser(token: string, Nazwa_uzytkownika: any, arg2: string) {
    cy.request('POST', '/api/identity/users').its('status').should('be', 204)
  }
  
  
}
