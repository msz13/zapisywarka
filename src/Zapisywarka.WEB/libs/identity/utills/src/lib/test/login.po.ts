import {}  from 'cypress'

export const getUserName = () => cy.get('[data-test=username]')

export const getPassword = ()=> cy.get('[data-test=password]')

export const getLoginButton = ()=> cy.get('[data-test=login-button')

export const getRememberMe = ()=> cy.get('[data-test=remember-me]')

export const getFormError = ()=> cy.get('[data-test=validation-error]')

export const getServerError = ()=> cy.get('[data-test=server-error]')

export const getLoadingProgress = ()=> cy.get('[data-test=loading-indicator]')