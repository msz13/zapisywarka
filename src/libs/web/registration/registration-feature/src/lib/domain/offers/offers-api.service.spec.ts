import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { OffersApiService } from './offers-api.service';

describe('OffersApiService', () => {
  let spectator: SpectatorHttp<OffersApiService>;
  const createHttp = createHttpFactory(OffersApiService);

  beforeEach(() => spectator = createHttp());

 it('can test HttpClient.get', () => {
    // spectator.service.getTodos().subscribe();
    // spectator.expectOne('api/todos', HttpMethod.GET);
  });
});
