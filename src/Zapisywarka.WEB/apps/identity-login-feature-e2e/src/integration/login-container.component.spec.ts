import {getFormError, getLoadingProgress, getLoginButton, getPassword, getRememberMe, getServerError, getUserName} from '@zapisywarka-client-aps/identity/utills'

describe('identity-login-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincontainercomponent--default'));

  it('should post login request', ()=>{

    const userName = 'msz'
    const password = 'a!123456'
    const rememberMe = true

    let sendResponse;
    const trigger = new Promise((resolve) => {
      sendResponse = resolve;
    });

    // Intercept requests to the URL we are loading data from and do not
    // let the response occur until our above Promise is resolved
    cy.intercept('POST', '/users/login', (request) => {
      return trigger.then(() => {
        request.reply({statusCode: 204});
      });
    }).as('loginReq');
    
    getLoadingProgress().should('not.exist')

    getUserName().type(userName)
    getPassword().type(password)
    getRememberMe().click()
    getLoginButton().click()
 
    getLoadingProgress().should('exist').then(()=>{
      sendResponse()
      getLoadingProgress().should('not.exist')
    })

    cy.wait('@loginReq').its('request.body').should('deep.equal', {
      userName: userName,
      password: password,
      rememberMe: rememberMe
    }) 
 
  })

  it('should show server error', ()=>{
    const userName = 'msz'
    const password = 'a!123456'
    const errMsg = 'Podano błędny login lub hasło'
  
    cy.intercept('POST', '/users/login', {forceNetworkError: true})
      .as('loginReq')
        
    getUserName().type(userName)
    getPassword().type(password)
  
    getLoginButton().click()

    cy.wait('@loginReq')

    getServerError().should('have.text', ' Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie ')
  })

 

  it('should show invalid credentials error', ()=>{

    const userName = 'msz'
    const password = 'a!123456'
    const errMsg = 'Podano błędny login lub hasło'
  
    cy.intercept('POST', '/users/login', {statusCode: 401, body: {message: errMsg}})
      .as('loginReq')

      
    getUserName().type(userName)
    getPassword().type(password)
  
    getLoginButton().click()

    cy.wait('@loginReq')

    getServerError().should('have.text', ' '+errMsg+' ')


  })

  describe('login credentials validation', ()=>{

    
    it('should show validation errors', ()=>{
      
      getUserName().focus().blur()
      getFormError().contains('Nazwa użytkownika jest wymagana')

      getPassword().focus().blur()
      getFormError().contains('Hasło jest wymagane')
    })
    
    it('should not send message if fields are empty', ()=>{
      
      getLoginButton().click()
      getFormError().contains('Nazwa użytkownika jest wymagana')
      getFormError().contains('Hasło jest wymagane')

    })

  })
});


