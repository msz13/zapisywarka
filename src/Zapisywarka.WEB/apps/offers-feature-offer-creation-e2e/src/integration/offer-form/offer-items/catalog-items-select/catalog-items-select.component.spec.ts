describe('offers-feature-offer-creation', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=catalogitemsselectcomponent--primary&knob-catalogItems&knob-categories'
    )
  );

  it('should render the component', () => {
    cy.get('app-catalog-items-select').should('exist');
  });
});
