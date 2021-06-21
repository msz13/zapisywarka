import {
  getAccessCode,
  getLoadingProgress,
  getNextButton,
  getPassword,
  getSignUpButton,
  getUserName,
} from '../support/sign-up-form.po';

describe('zapisywarka-sign-up', () => {
  beforeEach(() => cy.visit('/'));

  it('should post user', () => {
    const accessCode = 'TbkdNPHf';
    const userName = 'John';
    const password = 'Pasword_01';

    cy.intercept('POST', 'users/sign-up').as('new-user')

    getLoadingProgress().should('not.exist')
    
    getAccessCode().type(accessCode);
    getNextButton().click();
    getUserName().type(userName);
    getPassword().type(password);
    getSignUpButton().click();
    
    getLoadingProgress().should('exist')

    cy.wait('@new-user').its('request.body').should('deep.equal', {
      accessCode: accessCode,
      userName: userName,
      password: password
    })

  });

  it('should show validation errors', ()=> {
    
  })

});


