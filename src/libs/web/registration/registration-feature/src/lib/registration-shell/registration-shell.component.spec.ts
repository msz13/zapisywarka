
import { createComponentFactory, createRoutingFactory, Spectator, SpectatorRouting, SpyObject} from '@ngneat/spectator/jest'
import { byTestId, byTextContent } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationFeatureModule } from '../registration-feature.module';
import { of } from 'rxjs';
import { OfferDetails } from '../domain/offers/offer.model';
import { RegistrationDataService } from '../domain/registrations/registration-data.service.service';
import { ReservationInput } from '../domain/registrations/reservation.model'
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { OffersApiService } from '../domain/offers/offers-api.service';
import { OffersService } from '../domain/offers/offers.service';
import {SpectacularAppComponent, SpectacularFeatureRouter, SpectacularFeatureTestingModule} from '@ngworker/spectacular'
import { offerDetatilsListFixture } from '../utills/offer-details-list';
import { OffersStore} from '../state/offers/offers.store'


export class RegistratonFormPage { 
    
  constructor(private fixture: Spectator<TestAppComponent>) {}

  offerName() {
    return this.fixture.query(byTestId("form-name"))
  }

  offerItemsNames() {

    return this.fixture.queryAll(byTestId("offer-item"))
      .map(offerItem => offerItem.textContent)
  }

  reserveOfferItem(offerItemName: string, quantity: number) {
    const offeritem = this.fixture.query(byTextContent(offerItemName, {selector: '[data-testid=offer-item]'}))?.querySelector('input')
    if(!offeritem) {
      throw new Error(`can't find offer item with name: ${offerItemName}`)
    }
    this.fixture.typeInElement(quantity.toString(), offeritem)
  }

  enterComments(comments: string) {
     this.fixture.typeInElement(comments,'[data-testid=comments] input')
  }
  enterReceptionPassword(password: string) {
    this.fixture.typeInElement(password, '[data-testid=reception-password] input')
  } 

  confirmReservation() {
    this.fixture.click(byTestId("confirm-button"))
  }


}
  

@Component({
  template: "<router-outlet></router-outlet>"
})
export class TestAppComponent {}

@Component({
  template: `<p class="test" >Test component works!</p>`
})
export class TestComponent {}

describe('RegistrationShellComponent', () => {
  let spectator: Spectator<TestAppComponent>;  
  let page: RegistratonFormPage
  let offerApiService: SpyObject<OffersApiService>
  let router: SpectacularFeatureRouter

  const createComponent = createComponentFactory({
    component: SpectacularAppComponent,     
    imports: [ SpectacularFeatureTestingModule.withFeature({
      featureModule: RegistrationFeatureModule,
      featurePath: 'oferty'
    })],
    providers: [OffersService],
    mocks: [OffersApiService, RegistrationDataService],    
    detectChanges: false,    
    
  }); 

 
 
  beforeEach(async () => {
      spectator = createComponent()
      page = new RegistratonFormPage(spectator) 
      offerApiService = spectator.inject<OffersApiService>(OffersApiService) 
      router = spectator.inject(SpectacularFeatureRouter)    
  
  });


  describe('render registration form', ()=>{

    it('should load offers when opens offers route', async()=>{
      offerApiService.getAll.mockReturnValue(of(offerDetatilsListFixture))
      await router.navigate(['oferty/1'])      
      expect(spectator.inject(Location).path()).toBe('/oferty/1')
      const offersService = spectator.inject(OffersService)
      expect(offersService.getOffers()).toStrictEqual(offerDetatilsListFixture)
      
    })

    it("should show offer data when user open offer registration form", async ()=>{
        
        offerApiService.getAll.mockReturnValue(of(offerDetatilsListFixture))
        const testOffer = offerDetatilsListFixture[0]

        
        await router.navigate(['oferty', '1'])        
                 
        spectator.detectChanges()
        spectator.detectChanges()
       
                   
      expect(page.offerName()).toHaveText(testOffer.name)  
      expect(page.offerItemsNames()).toEqual(testOffer.offerItems.map(item => item.name))         
      
    })

    it.skip('should save reservetation when user accepts it', fakeAsync(()=>{
      offerApiService.getAll.mockReturnValue(of(offerDetatilsListFixture))
      const registrationService = spectator.inject(RegistrationDataService)
      
      
          
      spectator.detectChanges()

      page.enterReceptionPassword("Kowalski")
      page.enterComments("Odbierze żona")

      page.reserveOfferItem('Bochenek tradycyjny', 3)
      page.reserveOfferItem('Foremkowy', 1)

      page.confirmReservation()

      const expectedReservation: ReservationInput = {        
        receptionPassword: "Kowalski",
        comments: "Odbierze żona",
        reservedItems: [
          {
            offerItemId: "1",
            quantity: 3
          },
          { 
            offerItemId: "3",
            quantity: 1
          }
        ]
      }

      expect(registrationService.create).toHaveBeenCalledWith("1", expectedReservation)
      //TODO should load aftersubmit
      //TODO redirect to details expect(location.path()).toBe('/oferty/rejestracje/1')

    }))

 
  }) 


})

