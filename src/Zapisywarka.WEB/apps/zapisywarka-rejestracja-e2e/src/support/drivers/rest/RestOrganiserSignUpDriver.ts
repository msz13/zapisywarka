
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
  
  
}
