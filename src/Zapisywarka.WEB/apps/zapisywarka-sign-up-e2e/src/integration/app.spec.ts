import {
  getAccessCode,
  getNextButton,
  getPassword,
  getSignUpButton,
  getUserName,
} from '../support/registration-form.po';

describe('zapisywarka-sign-up', () => {
  beforeEach(() => cy.visit('/'));

  it('should post user', () => {
    const accessCode = 'TbkdNPHf';
    const userName = 'John';
    const password = 'Pasword_01';

    cy.intercept('POST', 'users/sign-up').as('new-user')

    getAccessCode().type(accessCode);
    getNextButton().click();
    getUserName().type(userName);
    getPassword().type(password);
    getSignUpButton().click();
    
    cy.wait('@new-user').its('request.body').should('deep.equal', {
      accessCode: accessCode,
      userName: userName,
      password: password
    })

  });
});
