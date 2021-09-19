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


Given(
  'Konto organizatora zapisów o nazwie {string} i haśle {string} zostało zarejestrowane',  (name: string, password: string) => {
     // userDriver.createUser('code', name, password)
  }
);


Given('Użytkownik odwiedza stronę logowania', ()=>{
  navigationDriver.navigate('login')
})


Given('Użytkownik loguje się zaznaczając opcję "Nie wylogowuj mnie"', ()=>{
 // authenticationDriver.typeLoginData(createdUser.name, createdUser.password,true)
})

And('Kiedy wprowadza login {string} oraz hasło {string}', (login: string, password: string)=> {
   // authenticationDriver.typeLoginData(login, password)
});

When('Niezalogowany użytkownik odwiedza stronę główną aplikacji', () => {
  // navigationDriver.navigate('/');
});

When('Próbuje się zalogować', ()=>{
   // authenticationDriver.login()
})

When('Kiedy ponownie odwiedza stronę startową', ()=>{
  navigationDriver.navigate('/')
})

Then('Przekierowany jest na stronę logowania', () => {
   navigationDriver.ShouldVisitLoginPage();
});

Then('Przekierowany jest na stronę główną aplikacji', ()=> {
    navigationDriver.ShouldVisitMainPage();
})

Then('Widzi swoją nazwę użytkownika {string}', (userName: string)=>{
  cy.get('[test-data=user_name]').contains(userName)
})

Then('Przekierowywany jest na stronę startową', ()=>{
    navigationDriver.ShouldVisitMainPage()
})

Then('Widzi komunikat {string}', (errorMessage)=>{
  getErrorMessage().contains(errorMessage)
})
