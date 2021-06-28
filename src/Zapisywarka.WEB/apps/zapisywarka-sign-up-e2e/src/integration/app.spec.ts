import {
  getAccessCode,
  getLoadingProgress,
  getNextButton,
  getPassword,
  getSignUpButton,
  getSignUpForm,
  getUserName,
  getValidationError,
} from '../support/sign-up-form.po';

describe('zapisywarka-sign-up', () => {
  beforeEach(() => cy.visit('/'));

  it('should post user', () => {
    const accessCode = 'TbkdNPHf';
    const userName = 'John';
    const password = 'Pasword_01';

    cy.intercept('POST', 'api/identity/users').as('new-user')

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

  describe("akccess token input", ()=>{

    it('should show sing-up form when akcess code is valid', ()=>{

      getSignUpForm().should('not.exist')

      getAccessCode().type('token')
      getNextButton().click();

      getSignUpForm().should('exist')

    })


    it('should validate access token', ()=> {
      getValidationError().should('not.exist') 

      getNextButton().click();
      getLoadingProgress().should('not.exist') 
      getValidationError().should('have.text', 'Kod dostępu jest wymagany')  
      getSignUpForm().should('not.exist')

      getAccessCode().find('input').type('token').clear().blur();
      getValidationError().should('have.text', 'Kod dostępu jest wymagany')                 
     
      
    })
  })


  describe('user name', ()=> {

    it('should validate user name', ()=>{
      getAccessCode().type('token')
      getNextButton().click();

      getUserName().find('input').type('name').clear().blur();
      getValidationError().should('have.text', 'Nazwa użytkownika jest wymagana') 

      getSignUpButton().click();
      getLoadingProgress().should('not.exist') 
      getValidationError().should('have.text', 'Nazwa użytkownika jest wymagana')  
      

      //TODO poprawić implementację, aby po naciśnięciu przycisku next pojawił się błąd waidacji, albo przycisk ma być nieaktywny

    })

  })

  describe('password', ()=> {
    it('should validate password', ()=>{
      getAccessCode().type('token')
      getNextButton().click();

      getPassword().find('input').type('pasword').clear().blur();
      getValidationError().should('exist').and('have.text', 'Hasło jest wymagane') 

    })
  })
 

});




