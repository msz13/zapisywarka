import { pactWith } from 'jest-pact';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { OffersApiService } from './offers-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { offerDetatilsListFixture } from '../../utills/fixtures/offer-details-list';
import { ConfigurationService } from '@zapisywarka-web/web-shared-domain';

pactWith({ consumer: 'zapisywarka-rejestracja', provider: 'zapisywarka-api' }, provider => {
  let client: SpectatorService<OffersApiService>;
  const createService = createServiceFactory({
    service: OffersApiService,
    imports: [HttpClientModule],
    mocks: [ConfigurationService]
  })

  beforeEach(() => {
    client = createService()
  });

  describe('health endpoint', () => {
    // Here we set up the interaction that the Pact
    // mock provider will expect.
    //
    // jest-pact takes care of validating and tearing
    // down the provider for you.
    beforeEach(() => // note the implicit return.
      // addInteraction returns a promise.
      // If you don't want to implict return,
      // you will need to `await` the result
      provider.addInteraction({
        state: "Offers are created",
        uponReceiving: 'A request for all offers',
        willRespondWith: {
          status: 200,
          body: JSON.stringify(offerDetatilsListFixture),
        },
        withRequest: {
          method: 'GET',
          path: '/offers',
        },
      })
    );

    // You also test that the API returns the correct
    // response to the data layer.
    //
    // Although Pact will ensure that the provider
    // returned the expected object, you need to test that
    // your code recieves the right object.
    //
    // This is often the same as the object that was
    // in the network response, but (as illustrated
    // here) not always.
    it('returns server health', async() => {
    
      const config = client.inject(ConfigurationService)
  
      config.getConfig.mockReturnValue({ apiUrl: provider.mockService.baseUrl })

      const res = await client.service.getAll().toPromise()
      expect(res).not.toBeNull()
      expect(res).toStrictEqual(offerDetatilsListFixture)
    
    })
  })
}); 

