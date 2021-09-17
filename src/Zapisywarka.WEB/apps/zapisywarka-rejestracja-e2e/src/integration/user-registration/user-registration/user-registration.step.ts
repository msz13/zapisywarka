import { NavigationDriver } from "../../../support/drivers/ui/navigation";
import { OrganiserSignUpDriver} from "../../../support/drivers/ui/organizer-regstration";
import { And, Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { RestOrganiserSignUpDriver } from "apps/zapisywarka-rejestracja-e2e/src/support/drivers/rest/RestOrganiserSignUpDriver";




let driver: OrganiserSignUpDriver
let navigationDriver: NavigationDriver
let restDriver: RestOrganiserSignUpDriver
let token: string 
let uniqueId: string 

const uniqueName = (userName: string)=> userName+'.'+uniqueId

Before(()=>{
    driver = new OrganiserSignUpDriver()
    restDriver = new RestOrganiserSignUpDriver()
    navigationDriver = new NavigationDriver()
    uniqueId =  Date.now().toString()
    navigationDriver.navigate('/sign-up')
    cy.intercept('POST', 'api/identity/users').as('createUser')
   
  
})


Given('Stworzono następujący kod dostępu: {string}', (givenToken)=>{
   //Utworzono przy inicjacji bazy 
   token = givenToken
   
})

Given("Organizator zapisów podał nazwę użytkownika {string}", (userName)=>{
    driver.enterUserName(userName)
 })


Given('Organizator zapisów podał kod dostępu {string}', (accesCode)=>{
    driver.enterAccessCode(accesCode)
})

Given("Baza użytkowników zawiera następujących organizatorów", (organisers)=> {
    const userName = uniqueName(organisers.hashes()[0].Nazwa_uzytkownika)
    console.log('token: ', token)
    restDriver.createUser(token, userName, 'Password_01')
})

Given("Organizator zapisów podał hasło {string}", password => {
    driver.enterPassword(password)
})

And("Organizator zapisów podał kod dostępu {string}", (accessToken)=>{
    driver.enterAccessCode(accessToken)
})

And('Organizator zapisów wypełnił dane rejestracji konta', (registrationData)=>{
    
    const {Nazwa_użytkownika: userName, Hasło: password, Potwierdzenie_hasła: passwordConfirmation } = registrationData.hashes()[0]
    
    driver.enterRegistrationData(uniqueName(userName), password, passwordConfirmation)
})

And("Organizator zapisów podaje nazwię użytkownika {string}", (userName) =>{
    const uniqueUserName = uniqueName(userName)

    driver.enterUserName(uniqueUserName)
})

When('Próbuję się zarejestrować', ()=>{
   driver.signUp()
})


When("Podaje potwierdzenie hasła {string}", passwordConfirmation => {
    driver.enterPasswordConfirmation(passwordConfirmation)
})

Then('Baza użytkowników zawiera organizatora zapisów o imieniu {string}', (userName)=>{
    
    restDriver.getOrganisers().should('deep.include', {username: uniqueName(userName)}) 
    
})


Then('Nie może procedować rejestracji i widzi komunikat {string}', (userName)=>{
    
    navigationDriver.ShouldSeeSignUpPage()
    //TODO dodać sprawdzenie komunikatu
    
})


And('Przekierowany jest na stronę logowania', ()=>{
    navigationDriver.ShouldVisitLoginPage()
})