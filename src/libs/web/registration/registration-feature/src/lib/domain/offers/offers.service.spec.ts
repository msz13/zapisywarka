import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { offerDetatilsListFixture } from '../../utills/offer-details-list';
import { OffersApiService } from './offers-api.service';
import { OffersService } from './offers.service';
import { of } from 'rxjs'

describe('OffersApiService', () => {
  let spectator: SpectatorService<OffersService>;
  const createService = createServiceFactory({
    service: OffersService,
    mocks: [OffersApiService]
  });

  beforeEach(() => spectator = createService());

  describe('load all offers', ()=>{

    it('should call api service', () => {
      const apiService = spectator.inject(OffersApiService)
      //apiService.getAll.mockReturnValue(of(offerDetatilsListFixture))

      spectator.service.loadOfferDetails()
      expect(apiService.getAll).toHaveBeenCalled()
    });

    it('should save offers to store', ()=>{
      
    })
  })
});
