import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { selectRows } from '@swimlane/ngx-datatable';
import { CatalogItem } from '../../../../@core/state/catalog';

import { ItemsFormPresenterService, OfferItemsSummary } from './items-form-presenter.service';

describe('ItemsFormPresenterService', () => {
  let service: ItemsFormPresenterService;
  let selected: CatalogItem[]

  beforeEach(() => {
    service = new ItemsFormPresenterService(new FormBuilder());
    selected = [{
      id: 1,
      name: 'Bochenek tradycyjny',
      categoryId: 1,
      price: 9,
      avaibleQuantity: 60
    }]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('form creation', ()=> {

    it("When items selected should map selected items to form array", fakeAsync(()=>{
      const expected = [{
        catalogItemId: 1,
        price: 9,
        avaibleQuantity: 60
      }]
     
        service.offerForm$.subscribe(control => {

          expect(control).toBeInstanceOf(FormArray)
          expect(control.length).toBe(1)
          expect(control.value).toEqual(expected)

      })

      service.mapSelectedToFormArray(selected);
      tick()

    }))

    it('when remove form item should emit new form array', fakeAsync(()=>{
        service.mapSelectedToFormArray(selected);
        tick()
        service.offerForm$.subscribe(control => {
          expect(control.length).toBe(0)         
        })
        
        service.removeFormItem(0)
        tick()

        

    }))   

    
    it('when remove offer form item should emit new selected array', fakeAsync(()=>{
        
               
        service.mapSelectedToFormArray(selected);
        tick()
        
        service.selected$.subscribe(selected => {
          expect(selected.length).toBe(0)
        
        })
        service.removeFormItem(0)        
        tick()       

    })) 
    
    it('when selected item is added should keep edited values', fakeAsync(()=>{
      const added: CatalogItem = {
        id: 6,
        name: 'Foremkowy z ziarnami',
        categoryId: 2,
        price: 6,
        avaibleQuantity: 40
      }

      let form: FormArray
      service.offerForm$.subscribe(control => form = control)  

      service.mapSelectedToFormArray(selected);
      tick()    
        
      form.at(0).get("price").setValue(12)
      expect(form.at(0).get("price").value).toBe(12)
      service.mapSelectedToFormArray([...selected, added])
      tick()
      
      expect(form.at(0).get("price").value).toBe(12)
      expect(form.length).toBe(2)
      expect(form.value.map(i => i.catalogItemId)).toEqual([1,6])
         

  })) 

it('when selected item is added should keep edited values', fakeAsync(()=>{
    const added: CatalogItem = {
      id: 6,
      name: 'Foremkowy z ziarnami',
      categoryId: 2,
      price: 6,
      avaibleQuantity: 40
    }

    let form: FormArray
    service.offerForm$.subscribe(control => form = control)  

    service.mapSelectedToFormArray(selected);
    tick()    
      
    form.at(0).get("price").setValue(12)
    expect(form.at(0).get("price").value).toBe(12)
    service.mapSelectedToFormArray([...selected, added])
    tick()
    
    expect(form.at(0).get("price").value).toBe(12)
    expect(form.length).toBe(2)
    expect(form.value.map(i => i.catalogItemId)).toEqual([1,6])       

})) 

//TODO refactor to two tests new form, and keep values
it('when selected item is removed should keep edited values', fakeAsync(()=>{
  const added: CatalogItem = {
    id: 6,
    name: 'Foremkowy z ziarnami',
    categoryId: 2,
    price: 6,
    avaibleQuantity: 40
  }

  let form: FormArray
  service.offerForm$.subscribe(control => form = control)  

  service.mapSelectedToFormArray(selected);
  tick()
  service.mapSelectedToFormArray([...selected, added])
  tick()

  form.at(0).get("price").setValue(12)
  expect(form.at(0).get("price").value).toBe(12)    
  
  service.mapSelectedToFormArray(selected)
  tick()        
 
  expect(form.at(0).get("price").value).toBe(12)
  expect(form.length).toBe(1)
  expect(form.value.map(i => i.catalogItemId)).toEqual([1])
     

})) 

it.skip('when more than one item is added to selcted should rise error', ()=>{

})
  
describe.only('form summary', ()=>{

  it('when selected shoud emit offer items summary', fakeAsync(()=>{
    const expected = {
      offerItemsTotalQuantity: 60,
      offerTotalValue: 540
    }
   
      service.offerItemsSummary$.subscribe(summary => {

        expect(summary).toEqual(expected)      

    })

    service.mapSelectedToFormArray(selected);
    tick()
  }))

  it('when selected second item shoud emit offer items summary', fakeAsync(()=>{
        
    const added: CatalogItem = {
      id: 6,
      name: 'Foremkowy z ziarnami',
      categoryId: 2,
      price: 6,
      avaibleQuantity: 40
    }
   
    const expected = {
      offerItemsTotalQuantity: 100
    }    
   

    service.mapSelectedToFormArray(selected);
    tick()

    service.offerItemsSummary$.subscribe(summary => {

        expect(summary).toEqual(expected)        

    })

    service.mapSelectedToFormArray([...selected, added]);
    tick()
  }))

  it('when item removed shoud emit offer items summary', fakeAsync(()=>{
    
    const added: CatalogItem = {
      id: 6,
      name: 'Foremkowy z ziarnami',
      categoryId: 2,
      price: 6,
      avaibleQuantity: 40
    }

      const expected = {
        offerItemsTotalQuantity: 40
      }    
   

      service.mapSelectedToFormArray(selected);
      tick()

      service.mapSelectedToFormArray([...selected, added]);
      tick()

      service.offerItemsSummary$.subscribe(summary => {

          expect(summary).toEqual(expected)        

      })

      service.removeFormItem(0)
      tick()
  }))

  

  it('when form controls edited shoud emit offer items summary', fakeAsync(()=>{
    
      const expected = {
        offerItemsTotalQuantity: 50
      }    
         
     

      let form: FormArray
      service.offerForm$.subscribe(control => form = control)
      service.mapSelectedToFormArray(selected);
      tick()

      let summary: OfferItemsSummary
      
      service.offerItemsSummary$.subscribe(summ => {
        summary = summ              

      })

      form.at(0).get("avaibleQuantity").setValue(50)
      expect(form.at(0).get("avaibleQuantity").value).toBe(50)
         
      tick()
      expect(summary).toEqual(expected)
      
  }))



})
    
})
});
