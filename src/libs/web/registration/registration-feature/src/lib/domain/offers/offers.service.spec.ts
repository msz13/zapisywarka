import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { offerDetatilsListFixture } from '../../utills/offer-details-list';
import { OffersApiService } from './offers-api.service';
import { OffersService } from './offers.service';
import { TestScheduler} from 'rxjs/testing'
import { SpyObject } from '@ngneat/spectator/jest';
import {ActivatedRouteStub} from '@ngneat/spectator'
import { fakeAsync, tick, flush } from '@angular/core/testing';
import { cold, Scheduler} from 'jest-marbles'
import { ActivatedRoute } from '@angular/router';

describe('OffersService', () => {
  let spectator: SpectatorService<OffersService>;
  let apiService: SpyObject<OffersApiService>
  let routeStub = new ActivatedRouteStub({
    params: {offerId: "1"}
  })
  const createService = createServiceFactory({
    service: OffersService,
    providers: [{provide: ActivatedRoute, useValue: routeStub}],
    mocks: [OffersApiService]
  });

  beforeEach(() => { 
    spectator = createService() 
    apiService = spectator.inject(OffersApiService)
  });

  describe('load all offers', ()=>{

 
    it('should save offers to store', ()=>{
      //apiService.getAll.mockReturnValue(of(offerDetatilsListFixture))
      apiService.getAll.mockReturnValue(cold('-a|', {a: offerDetatilsListFixture}))
    
      
      spectator.service.loadOfferDetails()
      Scheduler.get().flush()     
      
      
      expect(spectator.service.getOffers()).toStrictEqual(offerDetatilsListFixture)
    })

    it('should select offer when route param is set', ()=>{
               
      
      const route = spectator.inject(ActivatedRoute) as unknown as ActivatedRouteStub
      route.setParam('offerId', "1")

      Scheduler.get().flush()   
      expect(spectator.service.getSelectedOfferId()).toBe("1")

    })
  })

  it('should emit selected offer', ()=>{
    apiService.getAll.mockReturnValue(cold('-a|', {a: offerDetatilsListFixture}))
       
    spectator.service.loadOfferDetails()          
    Scheduler.get().flush() 

    const route = spectator.inject(ActivatedRoute) as unknown as ActivatedRouteStub
    route.setParam('offerId', "1")

    Scheduler.get().flush() 
      
    expect(spectator.service.selectedOffer$).toBeObservable(cold('--a', {a: offerDetatilsListFixture[0]}))

  })

  //TODO offer id is not in store
  //TODO roter emits emty observable
})
