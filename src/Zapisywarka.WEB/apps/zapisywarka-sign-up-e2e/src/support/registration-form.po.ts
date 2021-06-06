export function getSignUpButton() {
    return cy.get('[data-test=sign-up-button]')
}

export function getUserName() {
    return cy.get('[data-test=user-name]')
}


export function getPassword() {
    return cy.get('[data-test=password]')
}

export function getPasswordConfirmation() {
    return cy.get('[data-test=password-confirmation')
}


export function getAccessCode() {
    return cy.get('[data-test=access-code')
}

export function getNextButton() {
    return cy.get('[data-test=next-button]')
}