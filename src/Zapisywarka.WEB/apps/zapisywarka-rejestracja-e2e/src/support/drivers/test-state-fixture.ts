export function resetDatabse() {
  cy.request('POST', '/test-state');
}
