import { NavigationDriver } from "../../../support/drivers/ui/navigation";
import { OrganiserSignUpDriver} from "../../../support/drivers/ui/organizer-regstration";
import { And, Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { RestOrganiserSignUpDriver } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/rest/RestOrganiserSignUpDriver";
import { resetDatabse } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/test-state-fixture";
import { use } from "chai";

let driver: OrganiserSignUpDriver
let navigationDriver: NavigationDriver
let restDriver: RestOrganiserSignUpDriver
let token: string 

Before(()=>{
    driver = new OrganiserSignUpDriver()
    restDriver = new RestOrganiserSignUpDriver()
    navigationDriver = new NavigationDriver()
    navigationDriver.navigate('http://localhost:5000/sign-up')
    
   // resetDatabse()    
})


Given('Stworzono następujące kody dostępu: {string}', (token)=>{
   //Utworzono przy inicjacji bazy 
   token = token
})

Given("Organizator zapisów podał nazwę użytkownika {string}", (userName)=>{
    driver.enterUserName(userName)
 })


Given('Organizator zapisów podał kod dostępu {string}', (accesCode)=>{
    driver.enterAccessCode(accesCode)
})

Given("Baza użytkowników zawiera następujących organizatorów", (organisers)=> {
    restDriver.createUser(token, organisers.hashes()[0].Nazwa_uzytkownika, 'Password_01')
})

Given("Organizator zapisów podał hasło {string}", password => {
    driver.enterPassword(password)
})


And('Organizator zapisów wypełnił dane rejestracji konta', (registrationData)=>{
    
    const {Nazwa_użytkownika: userName, Hasło: password, Potwierdzenie_hasła: passwordConfirmation } = registrationData.hashes()[0]
    
    driver.enterRegistrationData(userName, password, passwordConfirmation)
})

And("Organizator zapisów próbuje podaje nazwię użytkownika {string}", (userName) =>{
    driver.enterUserName(userName)
})

When('Próbuję się zarejestrować', ()=>{
   driver.signUp()
})


When("Podaje potwierdzenie hasła {string}", passwordConfirmation => {
    driver.enterPasswordConfirmation(passwordConfirmation)
})

Then('Baza użytkowników zawiera organizatora zapisów o imieniu {string}', (userName)=>{
    
    restDriver.getOrganisers().should('deep.include', {username: userName}) 
    
})

Then('Nie może procedować rejestracji i widzimi komunikat {string}', (userName)=>{
    
    navigationDriver.ShouldSeelSignUpPage()
    
})


And('Przekierowany jest na stronę logowania', ()=>{
    navigationDriver.ShouldVisitLoginPage()
})