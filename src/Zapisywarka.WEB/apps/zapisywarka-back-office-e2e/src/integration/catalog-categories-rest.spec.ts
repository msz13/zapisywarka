describe('Catalog categories', ()=> {
    const url = 'http://localhost:5000/api/catalog-categories'

    context('add catalog category', ()=> {
        const category = {name: 'Bochenki'}
        beforeEach(()=> {
            cy.request('POST',url, category).as('create')
        })
        
        it('create catalog category', ()=> {
            
                       
            cy.get('@create').then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.category).to.have.property('name', category.name)
            })
        })

    })

    context('update category', ()=> {

        let categoryId
        const category = {name: 'Bochenki'}

        beforeEach(() => {
            cy.request('POST',url, category).as('create')
        })

        it('updates category', ()=> {

            cy.get('@create').then(res =>{
                categoryId = res.body.category.id
                    
                cy.request('PUT', `${url}/${categoryId}`, {id: categoryId, name: 'Foremkowe'}).then(res=>{
                    
                    expect(res.status).to.eq(204)
                   
                })
            })    

        })

        });
        
        

       
    
})