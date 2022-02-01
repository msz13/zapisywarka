export class LandingPageDriver {
  navigateLoginPage() {
    cy.get('[data-test=login-button]').click();
  }
  navigateSignUpPage() {
    cy.get('[data-test=sign-up-button]').click();
  }
}
