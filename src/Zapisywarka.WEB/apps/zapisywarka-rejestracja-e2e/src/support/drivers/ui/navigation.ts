
export class NavigationDriver { 
 
  navigate(url: string) {
    cy.visit(url);
  }

  ShoudVisitLoginPage() {
    cy.url().should('include', '/logowanie')
    
  }

  ShoudVisitMainPage() {
    cy.get('[data-test=main-page]').should('exist');
  }

  
  
  ShouldSeeSignUpPage() {
    cy.url().should('include', '/sign-up')
    
}
}
