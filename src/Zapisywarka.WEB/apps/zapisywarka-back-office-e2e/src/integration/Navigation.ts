export class Navigation {

    constructor() {}

    navigate(url: string) {
        cy.visit(url)
    }
}