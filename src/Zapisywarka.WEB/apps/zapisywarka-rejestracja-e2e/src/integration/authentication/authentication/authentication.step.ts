import { Before, Then, When } from "cypress-cucumber-preprocessor/steps"
import { NavigationDriver } from "../../../support/drivers/navigation"

let navigationDriver: NavigationDriver

Before(()=>{
    navigationDriver = new NavigationDriver()
})

When('Niezalogowany użytkownik chce wejśc na stronę główną', ()=>{
   navigationDriver.navigate('/')
})

Then('Przekierowany jest na stronę logowania', ()=>{
    navigationDriver.ShoudVisitLoginPage()
})