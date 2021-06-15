import { NavigationDriver } from "../../../support/drivers/ui/navigation";
import { OrganiserSignUpDriver} from "../../../support/drivers/ui/organizer-regstration";
import { And, Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { RestOrganiserSignUpDriver } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/rest/RestOrganiserSignUpDriver";
import { resetDatabse } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/test-state-fixture";

let driver: OrganiserSignUpDriver
let navigationDriver: NavigationDriver
let restDriver: RestOrganiserSignUpDriver 

Before(()=>{
    driver = new OrganiserSignUpDriver()
    restDriver = new RestOrganiserSignUpDriver()
    navigationDriver = new NavigationDriver()
    navigationDriver.navigate('http://localhost:5000/sign-up')
   // resetDatabse()    
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

Then('Baza użytkowników zawiera organizatora zapisów o imieniu {string}', (userName)=>{
    
    restDriver.getOrganisers().should('deep.include', {username: userName}) 
    
})

And('Przekierowany jest na stronę logowania', ()=>{
    navigationDriver.ShouldVisitLoginPage()
})