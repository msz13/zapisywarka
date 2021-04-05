describe('offers-feature-offer-creation', () => {
  beforeEach(() => cy.visit('/iframe.html?id=newoffercomponent--primary'));

  it('should render the component', () => {
    cy.get('new-offer').should('exist');
  });
});
