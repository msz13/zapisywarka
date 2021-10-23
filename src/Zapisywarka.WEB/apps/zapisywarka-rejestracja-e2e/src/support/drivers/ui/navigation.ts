
export class NavigationDriver {

  ShouldVisitLandingPage() {
    cy.url().should('include', '/main')
  } 
 
  navigate(url: string) {
    cy.visit(url);
  }

  ShouldVisitLoginPage() {
    cy.url().should('include', '/logowanie')
    
  }

  ShouldVisitMainPage() {
    cy.url().should('include', '/main')
    cy.get('[data-test=main-page]').should('exist');
  }
  
  
  ShouldSeeSignUpPage() {
    cy.url().should('include', '/sign-up')
    
}
}
