import { And, Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { NavigationDriver } from '../../../support/drivers/ui/navigation';
import { AuthenticationDriver } from '../../../support/drivers/ui/authentication';
import { RestOrganiserSignUpDriver } from 'apps/zapisywarka-rejestracja-e2e/src/support/drivers/rest/RestOrganiserSignUpDriver';
import { use } from 'chai';
import { getErrorMessage } from 'apps/zapisywarka-rejestracja-e2e/src/support/app.po';

let navigationDriver: NavigationDriver;
let authenticationDriver: AuthenticationDriver;
let userDriver: RestOrganiserSignUpDriver;
let createdUser: {name: string, password: string}

Before(() => {
  navigationDriver = new NavigationDriver();
  authenticationDriver = new AuthenticationDriver()
  userDriver = new RestOrganiserSignUpDriver()
});


Given('Organizator zapisów {string} zarejestrował konto z hasłem {string}',  (login: string, password: string) => {
    console.log(login+' '+password)
    // userDriver.createUser('code', name, password)
  }
);


And('Posiadacz konta {string} podaje hasło {string}', (login: string, password: string)=> {
  console.log(login+' '+password)
  // navigationDriver.navigate('/'); 
  // authenticationDriver.typeLoginData(login, password)
});


When('Próbuje się zalogować', ()=>{
   // authenticationDriver.login()
})

Then('Powinien otrzymać dostęp do aplikacji', (userName: string)=>{
  //cy.get('[test-data=user_name]').contains(userName)
})

Then('Widzi komunikat {string}', (errorMessage)=>{
 // getErrorMessage().contains(errorMessage)
})
