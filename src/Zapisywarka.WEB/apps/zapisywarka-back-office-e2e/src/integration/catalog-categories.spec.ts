describe("Catalog categories", () =>{

const getCategories = ()=> cy.get('[data-cy="category-list"]')
const getCategory = name=> cy.get('[data-cy="category"]').contains(name)
    it("should display catalog categories page", ()=> {
        cy.visit("/main/katalog/kategorie")
        
        cy.contains('Kategorie')
    })

    describe('Adding category', ()=> {

        const category = "Specjalne"
        const addCategory = name => {
            cy.get('[data-cy="name-input"]').type(name)
            
            cy.get('[data-cy="save"]').click()
        }

        beforeEach(()=>{
            cy.visit("localhost:4200/main/katalog/kategorie")
            cy.wait(300)            
                                   
        })
        it('clear input after adding new category name', ()=> {
            addCategory(category)
            cy.get('[data-cy="name-input"]').should('have.value', '')
         
        })

        it('should submit name on enter', ()=>{
            addCategory(category)
            cy.get('[data-cy="name-input"]').type('Bochenki {enter}')

            cy.get('[data-cy="name-input"]').should('have.value', '')


        })

        it.only('adds cateogry to list', ()=> {
            
            const categoryName = 'Bochenki' 
            
            cy.intercept('POST', 'api/catalog-categories', {id: 1, name: categoryName})
                .as('createCategory')
                   
            addCategory(categoryName)

            cy.wait('@createCategory').then(({request, response}) => {
                expect(request.body.name).to.eq(categoryName)
            }).get('[data-cy="category-list"]').contains(`${categoryName}`)
              .window().its('$$queries').its('catalogCategories').invoke('hasEntity', 1)

        })  
        
        it('add second category', ()=> {

            const firstCategory = "Bochenki"
            const secondCategory = "Foremkowe"
            const replies = [{ id: 1, name: firstCategory}, {id: 2, name: secondCategory}]

            cy.intercept('POST', 'api/catalog-categories', req => req.reply(replies.shift())
            
            ).as('createCategory')

            addCategory(firstCategory)

            cy.wait('@createCategory')         
                     
            addCategory(secondCategory)

            cy.wait('@createCategory')

            getCategories().get('[data-cy="category"]').should('have.length', 2)
            

        })

        it.only('disable saving category if name is empty', ()=>{
            cy.get('[data-cy="save"]').should('be.disabled')
        })
    })

    context('Categories list', () => {

        beforeEach(()=>{
            cy.visit("/main/katalog/kategorie")
            cy.wait(300)
                       
        })

        it('do not show categories list on empty list', ()=> {

            cy.get('[data-cy="category-list"]').should('not.exist')

        })

        it.skip('gets categories from server on first load')

        it.skip('not request server on secon load')

    })


    describe('Edit category', ()=> {
        beforeEach(()=> {
            cy.visit("/main/katalog/kategorie")
            const categories =  [{id: 1, name: 'Bochenki'}, {id: 2, name: 'Foremkowe'}, {id: 3, name: 'Specjalne'}]
            cy.window().its('$$stores').its('catalogCategories').invoke('set', categories)     
            cy.intercept('PUT', 'api/catalog-categories/2', {} ).as('updateReq')      
        })

        it('show input field on edit', ()=> {
            const category = "Foremkowe"
            cy.getBySel('list-item').eq(1).as('category')

            cy.get('@category').within(()=> {
                cy.get('[data-cy="edit"]').click({multiple: true})

            cy.get('[data-cy="edit-input"]').should('exist')
           // .and('have.value', category)
           
            cy.get('[data-cy="category"]').should('not.exist')
            
            cy.getBySel('save-btn').click()

            cy.get('[data-cy="category"]').should('exist')

            
            })

        })

            it('saves edited value', ()=> {
                cy.intercept('PUT', 'api/catalog-categories/2', {} )

                const category = "Foremkowe"
                const newCategory = "Foremkowe - małe"
                cy.getBySel('list-item').eq(1).as('category')
    
                cy.get('@category').within(()=> {
                    cy.get('[data-cy="edit"]').click({multiple: true})
    
                cy.get('[data-cy="edit-input"]').type(' - małe')
                
                cy.getBySel('save-btn').click()
    
                cy.wait('@updateReq').its('request.body').should('deep.equal', {id:2, name: newCategory})                        
                    
                })

                cy.window().its('$$queries').its('catalogCategories').invoke('getEntity', 2).then(category => {
                    expect(category.name).to.equal(newCategory)
                })

                cy.get('[data-cy="category-value"]').contains('Foremkowe - małe')


        })

      

       
    })

})