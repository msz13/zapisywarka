import {
  And,
  Before,
  Given,
  Then,
  When,
} from 'cypress-cucumber-preprocessor/steps';
import { NavigationDriver } from '../../../support/drivers/ui/navigation';
import { AuthenticationDriver } from '../../../support/drivers/ui/authentication';
import { RestOrganiserSignUpDriver } from '../../../support/drivers/rest/RestOrganiserSignUpDriver';

let navigationDriver: NavigationDriver;
let authenticationDriver: AuthenticationDriver;
let userDriver: RestOrganiserSignUpDriver;
let createdUser: { userName: string; password: string };
let uniqueId: string;

Before(() => {
  navigationDriver = new NavigationDriver();
  authenticationDriver = new AuthenticationDriver();
  uniqueId = Date.now().toString();
  userDriver = new RestOrganiserSignUpDriver();
});

Given(
  'Organizator zapisów {string} zarejestrował konto z hasłem {string}',
  (login: string, password: string) => {
    createdUser = { userName: login + uniqueId, password };
    userDriver.createUser('code', createdUser.userName, createdUser.password);
  }
);

Given(
  'Posiadacz konta {string} podaje hasło {string}',
  (login: string, password: string) => {
    navigationDriver.navigate('/logowanie');
    authenticationDriver.typeLoginData(login + uniqueId, password);
  }
);

When('Próbuje się zalogować', () => {
  cy.intercept('/users/login').as('authReq');
  authenticationDriver.login();
});

When('Niezalogowany użytkownik chce skorzystać z aplikacji', () => {
  navigationDriver.navigate('/main');
});

Then('Powinien otrzymać dostęp do swojego konta w aplikacji', () => {
  cy.wait('@authReq').then((interception) => {
    if (interception.responseWaited) {
      cy.getCookie('Auth')
        .should('exist')
        .should('have.property', 'httpOnly', true);
    }
  });

  navigationDriver.ShouldVisitMainPage();
  cy.get('[data-test=accaunt_name]').contains(createdUser.userName);
});

Then(
  'Nie ma dostępu do aplikacji i widzi komunikat {string}',
  (errorMessage) => {
    authenticationDriver.getServerError().should('have.text', errorMessage);
  }
);

Then('Przekierowywany jest na stronę startową', () => {
  navigationDriver.ShouldVisitLandingPage();
});
