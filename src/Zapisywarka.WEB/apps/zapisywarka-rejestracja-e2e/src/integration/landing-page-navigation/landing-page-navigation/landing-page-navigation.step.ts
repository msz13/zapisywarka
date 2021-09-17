import { NavigationDriver } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/ui/navigation";
import {LandingPageDriver } from 'apps/zapisywarka-rejestracja-e2e/src/support/drivers/ui/landing-page'
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let navigationDriver: NavigationDriver
let landingPageDriver: LandingPageDriver

beforeEach(()=>{
    navigationDriver = new NavigationDriver()
    landingPageDriver = new LandingPageDriver()
})

Given('Użytkownik odwiedził stronę główną', ()=>{
   navigationDriver.navigate("/")
})

When("Użytkownik kliknie link 'Załóż konto'", ()=>{
    landingPageDriver.navigateSignUpPage()
})

When("Użytkownik kliknie link 'Zaloguj'", ()=>{
    landingPageDriver.navigateLoginPage()
})

Then("Powinien zobaczyć stronę logowania", ()=>{
    navigationDriver.ShoudVisitLoginPage()
})

Then("Powinien zobaczyć stronę tworzenia konta", ()=>{
    navigationDriver.ShouldSeeSignUpPage()
})