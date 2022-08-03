import {
  getAccessCode,
  getLoadingProgress,
  getNextButton,
  getPassword,
  getPasswordConfirmation,
  getServerError,
  getSignUpButton,
  getUserName,
  getValidationError,
} from '../../support/sign-up-form.po';

describe('identity-sign-up-feature', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=signupcontainercomponent--primary')
  );

  it('should render the component', () => {
    cy.get('isf-sign-up').should('exist');
  });

  it('should post user', () => {
    const accessCode = 'TbkdNPHf';
    const userName = 'John';
    const password = 'Pasword_01';

   cy.intercept('POST', '**/users', {
      statusCode: 200,
      delay: 300,
    }).as('new-user'); 

   
    getLoadingProgress().should('not.exist');

    //getAccessCode().type(accessCode);
    //getNextButton().click();
    getUserName().type(userName);
    getPassword().type(password);
    getPasswordConfirmation().type(password);
    getSignUpButton().click();
   // getLoadingProgress().should('exist');

    cy.wait('@new-user').its('request.body').should('deep.equal', {
     // accessCode: accessCode,
      userName: userName,
      password: password,
    });
  });

  it('should show server error', () => {
    const accessCode = 'TbkdNPHf';
    const userName = 'John';
    const password = 'Pasword_01';

    cy.intercept('POST', '/users', { forceNetworkError: true }).as(
      'new-user'
    );

    getServerError().should('not.exist');
    //getAccessCode().type(accessCode);
    //getNextButton().click();
    getUserName().type(userName);
    getPassword().type(password);
    getPasswordConfirmation().type(password);
    getSignUpButton().click();

    getServerError().should(
      'have.text',
      'Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie'
    );
  });

  //TODO poprawić funkcję cy.intercept, aby nie wysyłała akcji do serwera
  //TODO zrobić testy user service, jeśli odpowiedź z serwera nie będzie 200, to wyrzuca błąd

  describe('user form', () => {

    it('should show requried fields validation errors when next button is clicked', () => {
      getSignUpButton().click();
      getLoadingProgress().should('not.exist');
      getValidationError()
        .eq(0)
        .should('have.text', 'Nazwa użytkownika jest wymagana');
      getValidationError().eq(1).should('have.text', 'Hasło jest wymagane');
      getValidationError()
        .eq(2)
        .should('have.text', 'Potwierdzenie hasła jest wymagane');
    });

    it('should validate user name', () => {
      getUserName().find('input').type('name').clear().blur();
      getValidationError()
        .eq(0)
        .should('have.text', 'Nazwa użytkownika jest wymagana');

      getUserName().find('input').type('n.').blur();
      getValidationError().should('have.length', 2);
    });

    it('should validate password', () => {
      getPassword().type('pasword1').clear().blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Hasło jest wymagane');

      getPassword().type('pasword').blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Hasło musi mieć minimum 8 znaków.');

      getPassword()
        .type(
          'pasword_pasword_pasword_pasword_pasword_pasword_pasword_pasword_1'
        )
        .blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Hasło musi mieć maksimum 64 znaków.');
    });

    it('should validate require password confirmation', () => {
      getPasswordConfirmation().type('pasword1').clear().blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Potwierdzenie hasła jest wymagane');
    });

    it('should validate password confirmation same as password', () => {
      getPassword().type('pasword1');
      getPasswordConfirmation().type('pas').blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Hasła nie są takie same');
    });
  });
});
