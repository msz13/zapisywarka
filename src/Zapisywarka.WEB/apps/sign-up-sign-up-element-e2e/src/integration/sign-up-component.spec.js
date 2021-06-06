describe('offers-feature-offer-creation', () => {
    beforeEach(() => cy.visit('/iframe.html?id=signupcomponent--primary'));
  
    it('should render the component', () => {
      cy.get('[data-test=sign-up]').should('exist')
    });
  });
  