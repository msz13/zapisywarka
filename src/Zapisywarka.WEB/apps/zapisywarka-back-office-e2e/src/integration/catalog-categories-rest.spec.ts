/* eslint-env mocha */
describe('create category API', () => {
    it('adding category to list', () => {

     const category = {name: 'Bochenki'}
    
      cy.request('POST', 'http://localhost:5000/api/catalog-categories', {name: 'Bochenki'}).then(()=>{
        cy.request('GET', 'http://localhost:5000/api/catalog-categories').then(
            (response) => {
                expect(response.body).to.deep.include.members([category])
            })
      })
        
    })

  })