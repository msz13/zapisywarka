import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { offerDetatilsListFixture } from '../../utills/offer-details-list';
import { OffersApiService } from './offers-api.service';
import { OffersService } from './offers.service';
import { TestScheduler } from 'rxjs/testing'
import { SpyObject } from '@ngneat/spectator/jest';
import { fakeAsync, tick, flush } from '@angular/core/testing';
import { cold, Scheduler } from 'jest-marbles'
import { ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';


export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observable's next value */
  setParamMap(params: Params = {}) {
    this.subject.next(convertToParamMap(params));
  }
}

describe('OffersService', () => {
  let spectator: SpectatorService<OffersService>;
  let apiService: SpyObject<OffersApiService>
  let routeStub: ActivatedRouteStub
  const createService = createServiceFactory({
    service: OffersService,
    mocks: [OffersApiService]
  });

  beforeEach(() => {
    routeStub = new ActivatedRouteStub()
    spectator = createService({ providers: [{ provide: ActivatedRoute, useValue: routeStub }] })
    apiService = spectator.inject(OffersApiService)
  });

  describe('load all offers', () => {


    
    it('shuold select offer with id when it is added to store', () => {
      //apiService.getAll.mockReturnValue(cold('-a|', { a: offerDetatilsListFixture }))
      apiService.getAll.mockReturnValue(of(offerDetatilsListFixture))

      spectator.service.loadOfferDetails()

      expect(spectator.service.selectOfferById("1")).toBeObservable(cold('a', { a: offerDetatilsListFixture[0] }))
      expect(spectator.service.selectOfferById("2")).toBeObservable(cold('a', { a: offerDetatilsListFixture[1] }))

    })


    //TODO offer id is not in store
    //TODO roter emits emty observable
  })
})
