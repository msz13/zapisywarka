
import { createComponentFactory, createRoutingFactory, Spectator, SpectatorRouting, SpyObject} from '@ngneat/spectator/jest'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationFeatureModule } from '../registration-feature.module';
import { of } from 'rxjs';
import {cold, Scheduler} from 'jest-marbles'
import { OfferDetails } from '../domain/offers/offer.model';
import { RegistrationApiService } from '../domain/registrations/registration-data.service.service';
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
import { RegistratonFormPage } from './RegistratonFormPage';
import { reservationDetailsFixture} from '../utills/reservationDetailsFixture'
import { reservationInputFixture } from '../utills/ReservationInputFixture';





describe('RegistrationShellComponent', () => {
  let spectator: Spectator<SpectacularAppComponent>;  
  let page: RegistratonFormPage
  let offerApiService: SpyObject<OffersApiService>
  let router: SpectacularFeatureRouter
  let location: Location

  const createComponent = createComponentFactory({
    component: SpectacularAppComponent,     
    imports: [ SpectacularFeatureTestingModule.withFeature({
      featureModule: RegistrationFeatureModule,
      featurePath: 'oferty'
    })],
    providers: [OffersService],
    mocks: [OffersApiService, RegistrationApiService],    
    detectChanges: false,    
    
  }); 

 
 
  beforeEach(async () => {
      spectator = createComponent()
      page = new RegistratonFormPage(spectator) 
      offerApiService = spectator.inject<OffersApiService>(OffersApiService) 
      router = spectator.inject(SpectacularFeatureRouter)    
      location = spectator.inject(Location)
  
  });


  describe('render registration form', ()=>{

    
    it("should show offer data when user open offer registration form", async ()=>{
        
        offerApiService.getAll.mockReturnValue(cold('-a|', {a: offerDetatilsListFixture}))
        const testOffer = offerDetatilsListFixture[0]

        
        await router.navigate(['oferty', '1'])        
        
        Scheduler.get().flush()
        spectator.detectChanges()
        //spectator.detectChanges()
       
                   
      expect(page.offerName()).toHaveText(testOffer.name)  
      expect(page.offerItemsNames()).toEqual(testOffer.offerItems.map(item => item.name))         
      
    })

    it('should save reservetation when user accepts it', async()=>{
      offerApiService.getAll.mockReturnValue(of(offerDetatilsListFixture))
      const registrationService = spectator.inject(RegistrationApiService)
      registrationService.submitReservation.mockReturnValue(cold('--a', {a: reservationDetailsFixture}))
      
      await router.navigate(['oferty', '1'])    
          
      spectator.detectChanges()

      expect(page.registrationLoader()).toBeNull()
      
      page.enterReceptionPassword("Kowalski")
      page.enterComments("Odbierze żona")
      page.reserveOfferItem('Bochenek tradycyjny', 3)
      page.reserveOfferItem('Foremkowy', 1)

      page.confirmReservation()

      const expectedReservation = reservationInputFixture
      
      expect(registrationService.submitReservation).toHaveBeenCalledWith("1", expectedReservation)
      expect(page.registrationLoader()).not.toBeNull()
      spectator.fixture.whenStable()
      //expect(location.path()).toBe('/oferty/rejestracje/1')
      //TODO should load aftersubmit
      //TODO redirect to details 

    })

 
  }) 


})

