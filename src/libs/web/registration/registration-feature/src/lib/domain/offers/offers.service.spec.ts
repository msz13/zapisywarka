import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { OffersService } from './offers.service';

describe('OffersApiService', () => {
  let spectator: SpectatorService<OffersService>;
  const createService = createServiceFactory(OffersService);

  beforeEach(() => spectator = createService());

 it('can test HttpClient.get', () => {
    // spectator.service.getTodos().subscribe();
    // spectator.expectOne('api/todos', HttpMethod.GET);
  });
});
