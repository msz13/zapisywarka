import { And, Before, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { NavigationDriver } from '../../../support/drivers/ui/navigation';
import { AuthenticationDriver } from '../../../support/drivers/ui/authentication';

let navigationDriver: NavigationDriver;
let authenticationDriver: AuthenticationDriver;

Before(() => {
  navigationDriver = new NavigationDriver();
  authenticationDriver = new AuthenticationDriver()
});

Before(()=> {
    navigationDriver.navigate('/sign-up')
}
)

When(
  'Konto organizatora zapisów o nazwie {string} i haśle {string} zostało zarejestrowane',
  () => {
    //uzytkownik dodany do bazy danych
    //TODO dodać programowo
  }
);

And('Kiedy poprawnie wypełnia login {string} oraz hasło {string}', (login: string, password: string)=> {
    authenticationDriver.typeLoginData(login, password)
});

When('Niezalogowany użytkownik chce wejśc na stronę główną', () => {
  navigationDriver.navigate('/');
});

When('Próbuje się zalogować', ()=>{
    authenticationDriver.login()
})

Then('Przekierowany jest na stronę logowania', () => {
  navigationDriver.ShoudVisitLoginPage();
});

Then('Przekierowany jest na stronę główną aplikacji', ()=> {
    navigationDriver.ShoudVisitMainPage();
})

Then('I widzi swój login {string}', (login: string)=>{
  cy.contains(login)
})