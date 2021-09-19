describe('identity-login-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincomponent--primary'));

  it('should render the component', () => {
    cy.get('zapisywarka-client-aps-login').should('exist');
  });
});
