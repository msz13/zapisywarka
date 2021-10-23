import { And, Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { NavigationDriver } from '../../../support/drivers/ui/navigation';
import { AuthenticationDriver } from '../../../support/drivers/ui/authentication';
import { RestOrganiserSignUpDriver } from '../../../support/drivers/rest/RestOrganiserSignUpDriver';


let navigationDriver: NavigationDriver;
let authenticationDriver: AuthenticationDriver;
let userDriver: RestOrganiserSignUpDriver;
let createdUser: {name: string, password: string}
let uniqueId: string

Before(() => {
  navigationDriver = new NavigationDriver();
  authenticationDriver = new AuthenticationDriver()
  uniqueId = Date.now().toString();
  userDriver = new RestOrganiserSignUpDriver()
});


Given('Organizator zapisów {string} zarejestrował konto z hasłem {string}',  (login: string, password: string) => {
    userDriver.createUser('code', login+uniqueId, password)
  }
);

Given('Posiadacz konta {string} podaje hasło {string}', (login: string, password: string) => {
  navigationDriver.navigate('/login')
  authenticationDriver.typeLoginData(login, password)
})



When('Próbuje się zalogować', ()=>{
    authenticationDriver.login()
})

When('Niezalogowany użytkownik chce skorzystać z aplikacji', ()=>{
  navigationDriver.navigate('/main')  
})

Then('Powinien otrzymać dostęp do aplikacji', (userName: string)=>{
  navigationDriver.ShouldVisitMainPage()
  cy.get('[test-data=accaunt_name]').contains(userName)
})

Then('Nie ma dostępu do aplikacji i widzi komunikat {string}', (errorMessage)=>{
   authenticationDriver.getServerError().should('be.a', errorMessage)
})

Then('Przekierowywany jest na stronę startową', () =>{
  navigationDriver.ShouldVisitLandingPage()
})
