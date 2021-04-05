describe('Catalog', ()=>{
    it('should load catalog items', ()=>{
        cy.visit('/main/katalog') 
        cy.wait(300)

        const items = [
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
            }]

        cy.window().its('$$stores').its('catalog').invoke('set', items) 
       
        cy.fixture('catalog-items.json').then((items)=>{
            
        })

    })
})