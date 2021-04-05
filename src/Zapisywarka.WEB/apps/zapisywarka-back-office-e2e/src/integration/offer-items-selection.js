const { createYield } = require("typescript")
const { get } = require("core-js/fn/dict")

const items =  [
    {
      "id": 1,
      "tenantId": "FC7A2C9F-54AE-40F5-81D8-E2FAE8DD8C2C",
      "name": "Bochenek tradycyjny",
      "categoryId": 1,
      "price": 9,
      "avaibleQuantity": 60
    },
    {
      "id": 2,
      "tenantId": "FC7A2C9F-54AE-40F5-81D8-E2FAE8DD8C2C",
      "name": "Bochenek francuski",
      "categoryId": 1,
      "price": 9,
      "avaibleQuantity": 60
    },
    {
      "id": 3,
      "tenantId": "FC7A2C9F-54AE-40F5-81D8-E2FAE8DD8C2C",
      "name": "Bochenek wiejski",
      "categoryId": 1,
      "price": 9,
      "avaibleQuantity": 60
    },
    {
      "id": 4,
      "tenantId": "FC7A2C9F-54AE-40F5-81D8-E2FAE8DD8C2C",
      "name": "Bochenek z szuszonymi pomidorami",
      "categoryId": 1,
      "price": 9,
      "avaibleQuantity": 60
    },
    {
      "id": 5,
      "tenantId": "FC7A2C9F-54AE-40F5-81D8-E2FAE8DD8C2C",
      "name": "Foremkowy",
      "categoryId": 2,
      "price": 6,
      "avaibleQuantity": 40
    },
    {
      "id": 6,
      "tenantId": "FC7A2C9F-54AE-40F5-81D8-E2FAE8DD8C2C",
      "name": "Foremkowy z żurawiną",
      "categoryId": 2,
      "price": 6,
      "avaibleQuantity": 40
    }]

const categories =
[{
"id": 1,
"name":"Bochenki"
}, {
"id": 2,
"name": "Foremkowe"
}, {
"id": 3,
"name": "Specjalne"
}]


describe('offer-items-selection', ()=>{
    /*beforeEach(()=>{
        cy.fixture('catalog-items.json').then((items)=>{
            cy.window().its('$$stores').its('catalog').invoke('set', items.items) 
        })
        cy.fixture('catalog-categories.json').then((categories)=>{
            cy.window().its('$$stores').its('catalogCategories').invoke('set', categories.categories) 
        })  
    })*/



    beforeEach(()=>{
        cy.intercept('GET','api/catalog-items',{})
        cy.visit('/main/nowa-oferta')
        cy.window().its('$$stores').its('catalog').invoke('set', items)
        cy.window().its('$$stores').its('catalogCategories').invoke('set', categories)
        cy.getBySel("open-selection").click()
        
    })

    it('should show catalog items', ()=>{

      const item =     {
        "name": "Bochenek francuski",
        "category": "Bochenki",
        "price": "9",
        "avaibleQuantity": 60
      }
        cy.contains('Wybierz pozycje')
        cy.get('.datatable-row-wrapper').should('have.length', 3)
        cy.get('.datatable-row-wrapper').filter(':contains("francuski")').should('have.length', 1)
        cy.get('.datatable-row-wrapper').filter(':contains("francuski")').within(($row) => {
          cy.get('.datatable-body-cell-label').should('have.length', 4)
          const rowValues = []
          cy.get('.datatable-body-cell-label').each(($el)=>{
            console.log($el.text())
            rowValues.push($el.text())
          }).then(()=>{
            console.log(JSON.stringify(rowValues))
            expect(rowValues).to.deep.equal(Object.values(item))

          })
          
        })
        
    })
        
})