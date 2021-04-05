import { endCollectionGraterThanStart, UniqueOfferNameValidator, uniqueOfferNameValidator } from './offer-basic-data-validators'
import { FormGroup, FormControl } from '@angular/forms'
import { OffersService } from 'app/@core/state/offers/offers.service'
import { HttpTestingController } from '@angular/common/http/testing'

describe('endCollectionGraterThanStart', ()=>{

    it('should return null when no is set values', ()=>{
        
        const sut = endCollectionGraterThanStart
        
        const control = new FormGroup({
            startCollectionDate: new FormControl(),
            endCollectionDate: new FormControl()
      })

      const result = endCollectionGraterThanStart(control)

      expect(result).toBeNull()

    })

    it('should return null when only startCollection value is set values', ()=>{
        
        const sut = endCollectionGraterThanStart
        
        const control = new FormGroup({
            startCollectionDate: new FormControl(new Date(2020,2,14,10,0)),
            endCollectionDate: new FormControl()
      })

      const result = endCollectionGraterThanStart(control)

      expect(result).toBeNull()

    })

    it('should return null when only endtCollection value is set values', ()=>{
        
        const sut = endCollectionGraterThanStart
        
        const control = new FormGroup({
            startCollectionDate: new FormControl(),
            endCollectionDate: new FormControl(new Date(2020,2,14,10,0))
      })

      const result = endCollectionGraterThanStart(control)

      expect(result).toBeNull()

    })
    
    it('should return error when endtCollection is erlier then startCollection', ()=>{
        
        const sut = endCollectionGraterThanStart
        
        const control = new FormGroup({
            startCollectionDate: new FormControl(new Date(2020,2,14,10,0)),
            endCollectionDate: new FormControl(new Date(2020,2,14,9,59))
      })

      const result = endCollectionGraterThanStart(control)

      expect(result.endCollectionGraterThanStart).toBeDefined()

    })

    it('should return error messsage when startCollection is erlier then endtCollection', ()=>{
        
        const sut = endCollectionGraterThanStart
        
        const control = new FormGroup({
            startCollectionDate: new FormControl(new Date(2020,2,14,10,0)),
            endCollectionDate: new FormControl(new Date(2020,2,14,9,59))
      })

      const result = endCollectionGraterThanStart(control)

      expect(result.endCollectionGraterThanStart.message).toBe('Data zakończenia odbioru nie może być mniejsza niż rozpoczęcia')

    })

   
    it('should return null when startCollection is erlier then endtCollection', ()=>{
        
        const sut = endCollectionGraterThanStart
        
        const control = new FormGroup({
            startCollectionDate: new FormControl(new Date(2020,2,14,9,59)),
            endCollectionDate: new FormControl(new Date(2020,2,14,10,0))
      })

      const result = endCollectionGraterThanStart(control)

      expect(result).toBeNull()

    })    


    describe('uniqueNameValidator', ()=>{


})

