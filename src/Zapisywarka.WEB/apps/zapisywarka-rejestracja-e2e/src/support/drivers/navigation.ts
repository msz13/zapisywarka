
export class NavigationDriver {
  navigate(url: string) {
    cy.visit(url);
  }

  ShoudVisitLoginPage() {
    cy.get('[data-test=login-form]').should('exist');
  }

  ShoudVisitMainPage() {
    cy.get('[data-test=main-page]').should('exist');
  }
}
