
export class OrganiserSignUpDriver {

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

}
