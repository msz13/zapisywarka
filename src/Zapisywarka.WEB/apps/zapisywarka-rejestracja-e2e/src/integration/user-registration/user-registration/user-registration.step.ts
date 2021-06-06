import { NavigationDriver } from "../../../support/drivers/navigation";
import { OrganiserRegistrationDriver } from "../../../support/drivers/organizer-regstration";
import { And, Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

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

Given('Organizator zapisów podał kod dostępu {string}', (accesCode)=>{
    driver.enterAccessCode(accesCode)
})

And('Organizator zapisów wypełnił dane rejestracji konta', (registrationDataTable)=>{
    
    const {Nazwa_użytkownika: userName, Hasło: password, Potwierdzenie_hasła: passwordConfirmation } = registrationDataTable.hashes()[0]
    
    driver.enterRegistrationData(userName, password, passwordConfirmation)
})

When('Próbuję się zarejestrować', ()=>{
    driver.signUp()
})

Then('Przekierowany jest na stronę logowania', ()=>{
    navigationDriver.ShouldVisitLoginPage()
})