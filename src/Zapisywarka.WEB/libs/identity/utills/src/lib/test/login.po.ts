import {}  from 'cypress'

export const getUserName = () => cy.get('[data-test=username]')

export const getPassword = ()=> cy.get('[data-test=password]')

export const getLoginButton = ()=> cy.get('[data-test=login-button')

export const getRememberMe = ()=> cy.get('[data-test=remember-me]')

export const getFormError = ()=> cy.get('[data-test=validation-error]')

export const getInvalidCredentialsError = ()=> cy.get('[data-test=invalid-credentials-error]')