import { NavigationDriver } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/navigation";
import { OrganiserRegistrationDriver } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/organizer-regstration";
import { And, Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps/index";

let driver: OrganiserRegistrationDriver
let navigationDriver: NavigationDriver

Before(()=>{
    driver = new OrganiserRegistrationDriver()
    navigationDriver = new NavigationDriver()
    navigationDriver.navigate('/rejestracja-konta')    
})


Given('Stworzono następujące kody dostępu:', ()=>{
   //Utworzono przy inicjacji bazy 
})

Given('Organizator zapisów wpisał kod {string}', (accesCode)=>{
    driver.enterAccessCode(accesCode)
})

And('Organizator zapisów wypełnił dane rejestracji konta', (registrationDataTable)=>{
    
    const {Nazwa_użytkownika: UserName, Hasło: Password, Potwierdzenie_hasła: PasswordConfirmation } = registrationDataTable.hashes()

    
    driver.enterRegistrationData(UserName, Password, PasswordConfirmation)
})

When('Próbuję się zarejestrować', ()=>{
    driver.signUp()
})

Then('Przekierowany jest na stronę logowania', ()=>{
    navigationDriver.ShouldVisitLoginPage()
})