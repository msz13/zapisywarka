describe('offers-feature-offer-creation', () => {
  beforeEach(() => cy.visit('/iframe.html?id=offeritemscomponent--primary'));

  it('should render the component', () => {
    cy.get('zapisywarka-client-aps-offer-items').should('exist');
  });
});
