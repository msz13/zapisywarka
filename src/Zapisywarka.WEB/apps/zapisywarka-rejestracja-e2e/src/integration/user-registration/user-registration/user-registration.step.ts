import { NavigationDriver } from "../../../support/drivers/ui/navigation";
import { OrganiserSignUpDriver} from "../../../support/drivers/ui/organizer-regstration";
import { And, Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let driver: OrganiserSignUpDriver
let navigationDriver: NavigationDriver

Before(()=>{
    driver = new OrganiserSignUpDriver()
    navigationDriver = new NavigationDriver()
    navigationDriver.navigate('/sign-up')    
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