
export class OfferBasicDataStub {
   
    constructor () {

    }

    createOfferWithName(name: any) {
        cy.intercept('HEAD', `offers/${name}`, {statusCode: 404})
    }

}