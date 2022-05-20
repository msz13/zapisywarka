import {
  getLoginButton,
  getRememberMe,
  getServerError,
  getUserName,
  getPassword,
} from '@zapisywarka/identity/utills';

export class AuthenticationDriver {
  typeLoginData(login: string, password: string, rememberMe = false) {
    getUserName().type(login);

    getPassword().type(password);

    if (rememberMe) {
      getRememberMe().click();
    }
  }

  login() {
    getLoginButton().click();
  }

  getServerError() {
    return getServerError();
  }
}
