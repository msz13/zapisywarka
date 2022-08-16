import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { RegistrationDataService} from './registration-data.service.service';

describe('RegistrationData.ServiceService', () => {
  let spectator: SpectatorHttp<RegistrationDataService>;
  const createHttp = createHttpFactory(RegistrationDataService);

  beforeEach(() => spectator = createHttp());

 it('can test HttpClient.get', () => {
    // spectator.service.getTodos().subscribe();
    // spectator.expectOne('api/todos', HttpMethod.GET);
  });
});
