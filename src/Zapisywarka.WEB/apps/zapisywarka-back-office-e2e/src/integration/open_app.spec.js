describe("should open app", ()=> {
    it('should open start page', ()=> {
        cy.visit('localhost:4200/main/nowa-oferta')
        
        const date = '2020-01-10 16:00'
        cy.get('#inputEndOffer').type(date)
            .should('have.value', date )
        
            cy.get('.stepper-buttons').contains('DALEJ').click()
        
    })
})