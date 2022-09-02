import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { offerDetatilsListFixture } from '../../utills/fixtures/offer-details-list';
import { OffersApiService } from './offers-api.service';
import { OffersService } from './offers.service';
import { SpyObject } from '@ngneat/spectator/jest';
import { cold } from 'jest-marbles'
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('OffersService', () => {
  let spectator: SpectatorService<OffersService>;
  let apiService: SpyObject<OffersApiService>
  const createService = createServiceFactory({
    service: OffersService,
    mocks: [OffersApiService]
  });

  beforeEach(() => {
    spectator = createService()
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
