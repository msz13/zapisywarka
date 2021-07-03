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
    getPasswordConfirmation().type(password)
    getSignUpButton().click();
    
    getLoadingProgress().should('exist')

    cy.wait('@new-user').its('request.body').should('deep.equal', {
      accessCode: accessCode,
      userName: userName,
      password: password
    })

  });

  it('should trim user name', ()=> {
    const accessCode = 'TbkdNPHf';
    const userName = '   John   ';
    const password = 'Pasword_01';

    cy.intercept('POST', 'api/identity/users').as('new-user')

        
    getAccessCode().type(accessCode);
    getNextButton().click();
    getUserName().type(userName);
    getPassword().type(password);
    getPasswordConfirmation().type(password)
    getSignUpButton().click();
    
    cy.wait('@new-user').its('request.body').should('to.have.property', 'userName', 'John')

  })

  it('should show server error', ()=>{
    const accessCode = 'TbkdNPHf';
    const userName = 'John';
    const password = 'Pasword_01';

    cy.intercept('POST', 'api/identity/users', (req) =>  {
      req.reply({
        statusCode: 500,
        body: "Internal server error",
        
      })          
    }).as('new-user')

    getServerError().should('not.exist')
    getAccessCode().type(accessCode);
    getNextButton().click();
    getUserName().type(userName);
    getPassword().type(password);
    getPasswordConfirmation().type(password)
    getSignUpButton().click();
    
    getServerError().should('have.text', "Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie")    
  
      
  })

  //TODO poprawić funkcję cy.intercepte, aby nie wysyłała akcji do serwera
  //TODO zrobić testy user service, jeśli odpowiedź z serwera nie będzie 200, to wyrzuca błąd

  describe("akccess token input", ()=>{

    it('should show sing-up form when akcess code is valid', ()=>{

      getSignUpForm().should('not.exist')

      getAccessCode().type('token')
      getNextButton().click();

      getSignUpForm().should('exist')

    })


    it('should validate access token', ()=> {
      getValidationError().should('not.exist') 
      getNextButton().should('be.disabled')    
         
      getAccessCode().find('input').type('token').clear().blur();
      getValidationError().should('have.text', 'Kod dostępu jest wymagany') 
      
      getNextButton().should('be.disabled') 
     
      
    })
   
  })


  describe('user form', ()=> {
    beforeEach(()=>{
      getAccessCode().type('token')
      getNextButton().click();
    })

    it('should show validation error when next button is clicked', () =>{

      getSignUpButton().click();
      getLoadingProgress().should('not.exist') 
      getValidationError().eq(0).should('have.text', 'Nazwa użytkownika jest wymagana')
      getValidationError().eq(1).should('have.text', 'Hasło jest wymagane')
      getValidationError().eq(2).should('have.text', 'Potwierdzenie hasła jest wymagane') 

    })

    it('should validate user name', ()=>{     
     

      getUserName().find('input').type('name').clear().blur();
      getValidationError().eq(0).should('have.text', 'Nazwa użytkownika jest wymagana')        
      

      

    })

    it('should validate password', ()=>{
   
      getPassword().find('input').type('pasword').clear().blur();
      getValidationError().should('exist').and('have.text', 'Hasło jest wymagane') 

    })

    it('should validate password confirmation', ()=>{
     
      getPasswordConfirmation().find('input').type('pasword').clear().blur();
      getValidationError().should('exist').and('have.text', 'Potwierdzenie hasła jest wymagane') 

    })

  })

 

});






