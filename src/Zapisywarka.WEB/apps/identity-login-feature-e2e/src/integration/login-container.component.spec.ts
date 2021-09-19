describe('identity-login-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincontainercomponent--primary'));

  it('should render the component', () => {
    cy.get('test').should('exist');
  });
});
