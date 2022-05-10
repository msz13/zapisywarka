import {
  getAccessCode,
  getLoadingProgress,
  getNextButton,
  getPassword,
  getPasswordConfirmation,
  getServerError,
  getSignUpButton,
  getSignUpForm,
  getUserName,
  getValidationError,
} from '../../support/sign-up-form.po';

describe('identity-sign-up-feature', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=signupcomponent--primary&knob-loading&knob-error')
  );

  it('should render the component', () => {
    cy.get('app-sign-up').should('exist');
  });

  describe('akccess token input', () => {
    it('should show sign-up form when akcess code is valid', () => {
      getSignUpForm().should('not.exist');

      getAccessCode().type('token');
      getNextButton().click();

      getSignUpForm().should('exist');
    });

    it('should validate access token', () => {
      getValidationError().should('not.exist');
      getNextButton().should('be.disabled');

      getAccessCode().find('input').type('token').clear().blur();
      getValidationError().should('have.text', 'Kod dostępu jest wymagany');

      getNextButton().should('be.disabled');
    });
  });

  describe('user form', () => {
    beforeEach(() => {
      getAccessCode().type('token');
      getNextButton().click();
    });

    it('should show validation error when next button is clicked', () => {
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
      getPassword().find('input').type('pasword1').clear().blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Hasło jest wymagane');

      getPassword().find('input').type('pasword').blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Hasło musi mieć minimum 8 znaków długości');

      getPassword()
        .find('input')
        .type(
          'pasword_pasword_pasword_pasword_pasword_pasword_pasword_pasword_1'
        )
        .blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Hasło musi mieć maksimum 64 znaki długości');
    });

    it('should validate require password confirmation', () => {
      getPasswordConfirmation().find('input').type('pasword1').clear().blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Potwierdzenie hasła jest wymagane');
    });

    it('should validate password confirmation', () => {
      getPassword().find('input').type('pasword1');
      getPasswordConfirmation().find('input').type('pas').blur();
      getValidationError()
        .should('exist')
        .and('have.text', 'Hasła nie są takie same');
    });
  });
});
