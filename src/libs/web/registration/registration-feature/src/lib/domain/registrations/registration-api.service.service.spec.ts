import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { RegistrationApiService} from './registration-api.service.service';

describe('RegistrationData.ServiceService', () => {
  let spectator: SpectatorHttp<RegistrationApiService>;
  const createHttp = createHttpFactory(RegistrationApiService);

  beforeEach(() => spectator = createHttp());

 it('can test HttpClient.get', () => {
    // spectator.service.getTodos().subscribe();
    // spectator.expectOne('api/todos', HttpMethod.GET);
  });
});
