import { contains } from "cypress/types/jquery"
import { newOfferBasicData } from "../support/ui-objects/new-offer-basic-data"
import {newOfferItemsSelection} from "../support/ui-objects/new-offer-items-indication"
import { OfferBasicDataStub } from "./OfferBasicDataStub"


export class OffersMenagerSteps {
   
      
    offerName: string = "Poniedziałek, 01 luty"
    endOfferDate: string = "2020-02-03 17:00"
    startCollectionDate: string = "2020-02-03 10:00"
    endCollectionDate: string = "2020-02-03 17:00"
    
   
    enterOfferEndDate(date: string) {
        newOfferBasicData.endOfferDate().type(date, {force: true})
    /*   console.log('date', date)
       newOfferBasicData.endOfferDate().click()
       const day = Cypress.moment(date).date()
       console.log('day', day)
       const hour = Cypress.moment(date).hour()
       const minute = Cypress.moment(date).minute()
       cy.contains(day).click()
       cy.contains(`${hour}:${minute}`).click()
       cy.contains('ok').click()*/
    }

    enterOfferName(name: string) {
        newOfferBasicData.nameInput().type(name, {delay: 5})
    }

    enterStartCollectionDate(date: string) {
        cy.getBySel('start-collection').within(()=>cy.get('input').type(date, {force: true})) 
    }

   
    enterEndCollectionDate(date?: string) {

      const endCollection = date? date : this.endCollectionDate
      newOfferBasicData.endCollectionDate().type(endCollection, {force: true})

    }

    shouldBeAbleToProccesOfferFrom() {
        
        cy.contains('Pozycje oferty')
    }

    shouldNotBeAbleToProccesOfferFrom() {
       newOfferItemsSelection.title().should('not.to.exist')
    }

    enterNullValue(field: any) {

        switch(field) {
            case "Nazwa oferty":
                cy.getBySel('offer-name').within(()=>cy.get('input').focus().blur())
                break
            default: console.log(field)
        }
    }

    shouldSeeMessage(message: any) {
        cy.get('form').should('contain', message)
    }

   
    enterOfferBasicData() {
        this.enterOfferName(this.offerName)
        this.enterOfferEndDate(this.endOfferDate)
        this.enterStartCollectionDate(this.startCollectionDate)
        this.enterEndCollectionDate(this.endCollectionDate)
    }
   
    clickOnSecondStep() {
        newOfferBasicData.nextButton().click({force: true})
    }

    createOfferWithName(name: any) {
        this.enterOfferName(name)
        this.enterOfferEndDate(this.endOfferDate)
        this.enterStartCollectionDate(this.startCollectionDate)
        this.enterEndCollectionDate(this.endCollectionDate)
    }
    
  
    withStub() {
        return new OfferBasicDataStub()
    }

    
}