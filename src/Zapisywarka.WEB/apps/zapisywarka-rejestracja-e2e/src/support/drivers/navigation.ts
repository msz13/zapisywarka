export class NavigationDriver {
    
    
    navigate(url: string) {
        cy.visit(url)
    }

    ShoudVisitLoginPage() {
        cy.get('[data-test=login-page]').should('exist')
    }
}
