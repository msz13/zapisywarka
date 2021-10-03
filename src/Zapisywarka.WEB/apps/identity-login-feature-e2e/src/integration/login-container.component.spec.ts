import {getFormError, getInvalidCredentialsError, getLoginButton, getPassword, getRememberMe, getUserName} from '@zapisywarka-client-aps/identity/utills'

describe('identity-login-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincontainercomponent--default'));


  it('should post login request', ()=>{

    const userName = 'msz'
    const password = 'a!123456'
    const rememberMe = true

    cy.intercept('POST', '/users/login').as('loginReq')

    getUserName().type(userName)
    getPassword().type(password)
    getRememberMe().click()
    getLoginButton().click()

    cy.wait('@loginReq').its('request.body').should('deep.equal', {
      userName: userName,
      password: password,
      rememberMe: rememberMe
    })
  })

  it('should show server error', ()=>{
    
  })

  it('should show loading state', ()=>{

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

    getInvalidCredentialsError().should('have.text', errMsg)


  })

  describe('login credentials validation', ()=>{

    
    it('should show validation errors', ()=>{
      
      getUserName().focus().blur()
      getFormError().contains('Nazwa użytkownika jest wymagana')

      getPassword().focus().blur()
      getFormError().contains('Hasło jest wymagane')
    })
    
    it.only('should not send message if fields are empty', ()=>{
      
      getLoginButton().click()
      getFormError().contains('Nazwa użytkownika jest wymagana')
      getFormError().contains('Hasło jest wymagane')

    })

  })
});


