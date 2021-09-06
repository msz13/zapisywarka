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
  beforeEach(() => cy.visit('/iframe.html?id=signupcontainercomponent--primary'));

  it('should render the component', () => {
    cy.get('app-sing-iup-coint').should('exist');
  });

  it('should post user', () => {
    const accessCode = 'TbkdNPHf';
    const userName = 'John';
    const password = 'Pasword_01';

    cy.intercept('POST', 'api/identity/users', {statusCode: 500, delay: 300}) .as('new-user')

    getLoadingProgress().should('not.exist')
    
    getAccessCode().type(accessCode);
    getNextButton().click();
    getUserName().type(userName);
    getPassword().type(password);
    getPasswordConfirmation().type(password)
    getSignUpButton().click();
    getLoadingProgress().should('exist')
    

    cy.wait('@new-user').its('request.body').should('deep.equal', {
      accessCode: accessCode,
      userName: userName,
      password: password
    })

  })

   


  it('should show server error', ()=>{
    const accessCode = 'TbkdNPHf';
    const userName = 'John';
    const password = 'Pasword_01';

  
    cy.intercept('POST', 'api/identity/users', {forceNetworkError: true})          
    .as('new-user')

    getServerError().should('not.exist')
    getAccessCode().type(accessCode);
    getNextButton().click();
    getUserName().type(userName);
    getPassword().type(password);
    getPasswordConfirmation().type(password)
    getSignUpButton().click();
    
    getServerError().should('have.text', ' Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie ')    
  
      
  })

  //TODO poprawić funkcję cy.intercept, aby nie wysyłała akcji do serwera
  //TODO zrobić testy user service, jeśli odpowiedź z serwera nie będzie 200, to wyrzuca błąd
});

