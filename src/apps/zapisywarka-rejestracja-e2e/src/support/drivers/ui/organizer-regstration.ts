import {
  getPassword,
  getPasswordConfirmation,
  getSignUpButton,
  getUserName,
  getAccessCode,
  getNextButton,
} from '../../sign-up-form.po';

export class OrganiserSignUpDriver {
  signUp() {
    getSignUpButton().click();
  }

  enterRegistrationData(
    userName: string,
    password: string,
    passwordConfirmation: string
  ) {
    this.enterUserName(userName);
    this.enterPassword(password);
    this.enterPasswordConfirmation(passwordConfirmation);
  }
  enterAccessCode(accesCode: string) {
    getAccessCode().type(accesCode);
    getNextButton().click();
  }

  enterUserName(userName: string) {
    getUserName().type(userName);
  }

  enterPassword(password: string) {
    getPassword().type(password);
  }

  enterPasswordConfirmation(passwordConfirmation: any) {
    getPasswordConfirmation().type(passwordConfirmation);
  }
}
