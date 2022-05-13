import { NavigationDriver } from '../../../../src/support/drivers/ui/navigation';
import { WebLandingPageDriver } from '../../../../src/support/drivers/ui/landing-page';
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

let navigationDriver: NavigationDriver;
let landingPageDriver: WebLandingPageDriver;

beforeEach(() => {
  navigationDriver = new NavigationDriver();
  landingPageDriver = new WebLandingPageDriver();
});

Given('Użytkownik odwiedził stronę główną', () => {
  navigationDriver.navigate('/');
});

When("Użytkownik kliknie link 'Załóż konto'", () => {
  landingPageDriver.navigateSignUpPage();
});

When("Użytkownik kliknie link 'Zaloguj'", () => {
  landingPageDriver.navigateLoginPage();
});

Then('Powinien zobaczyć stronę logowania', () => {
  navigationDriver.ShouldVisitLoginPage();
});

Then('Powinien zobaczyć stronę tworzenia konta', () => {
  navigationDriver.ShouldSeeSignUpPage();
});
