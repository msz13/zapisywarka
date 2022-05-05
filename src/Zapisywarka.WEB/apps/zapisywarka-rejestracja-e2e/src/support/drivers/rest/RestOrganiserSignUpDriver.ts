
export class RestOrganiserSignUpDriver {
    
    baseApiUrl: string = "http://api.zapisywarka.local" 

    apiUrl = this.baseApiUrl + '/users'
   
    accessCode: string = ""
    userName: string = ""
    password: string =""

   
    enterRegistrationData(userName: string, password: string, passwordConfirmation: string) {
        
      this.userName= userName
      this.password = password
    }

    enterAccessCode(accesCode: any) {
        
     this.accessCode = accesCode
        
    }

    getOrganisers() {
    //  cy.wait('@createUser')
      return cy.request('GET', this.apiUrl).its('body')
  }

  createUser(token: string, Nazwa_uzytkownika: any, password: string) {
    cy.request('POST', this.apiUrl, {
      accessCode: token,
      userName: Nazwa_uzytkownika,
      password: password
    }).its('status').should('to.equal', 204)
  }
  
  
}
