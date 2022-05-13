import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { ConfigurationService } from '@zapisywarka-client-aps/shared/domain';
import { LoginCredentials } from '..';
import { SessionQuery } from './session/session.query';
import { UserService, UserInfo } from './user-service.service';

describe('user service', () => {
  describe('login user', () => {
    let spectator: SpectatorHttp<UserService>;

    const baseUrl = 'http://test.pl';
    class StubConfigSrv {
      getConfig() {
        return {
          apiUrl: baseUrl,
        };
      }
    }
    const createHttp = createHttpFactory({
      service: UserService,
      providers: [{ provide: ConfigurationService, useClass: StubConfigSrv }],
    });

    beforeEach(() => (spectator = createHttp()));

    it('should save logged user to store', () => {
      const query = spectator.inject(SessionQuery);
      const loginCredentials: LoginCredentials = {
        userName: 'test',
        password: 'password',
      };
      const userInfo = { id: '1', userName: loginCredentials.userName };

      spectator.service.login(loginCredentials).subscribe();

      const req = spectator.expectOne(
        baseUrl + '/users/login',
        HttpMethod.POST
      );

      req.flush(userInfo, { status: 200, statusText: 'success' });
      expect(req.request.body).toEqual(loginCredentials);

      let isLoggedIn: boolean;
      query.isLoggedIn().subscribe((result) => (isLoggedIn = result));

      let responseUser: UserInfo;

      query.select().subscribe((user) => (responseUser = user));

      expect(isLoggedIn).toBe(true);
      expect(responseUser).toEqual(userInfo);
    });
  });

  describe('Load user', () => {
    let spectator: SpectatorHttp<UserService>;

    const baseUrl = 'http://test.pl';
    class StubConfigSrv {
      getConfig() {
        return {
          apiUrl: baseUrl,
        };
      }
    }
    const createHttp = createHttpFactory({
      service: UserService,
      providers: [{ provide: ConfigurationService, useClass: StubConfigSrv }],
    });

    beforeEach(() => (spectator = createHttp()));

    it('should load user', () => {
      spectator.service.loadUser().subscribe();

      spectator.expectOne(baseUrl + '/users/me', HttpMethod.GET);
    });

    it('should save user to store', () => {
      const user = { id: '1', userName: 'mat' };
      const query = spectator.inject(SessionQuery);

      spectator.service.loadUser().subscribe();

      const req = spectator.expectOne(baseUrl + '/users/me', HttpMethod.GET);

      req.flush(user, { status: 200, statusText: 'test' });

      let isLoggedIn: boolean;
      query.isLoggedIn().subscribe((result) => (isLoggedIn = result));

      expect(isLoggedIn).toBe(true);
    });

    it('should not save user to store when user is not logged in', () => {
      const query = spectator.inject(SessionQuery);

      spectator.service.loadUser().subscribe();

      const req = spectator.expectOne(baseUrl + '/users/me', HttpMethod.GET);

      req.flush({ status: 401, statusText: 'anauthenticated' });

      let isLoggedIn: boolean;
      query.isLoggedIn().subscribe((result) => (isLoggedIn = result));

      expect(isLoggedIn).toBe(false);
    });
  });
});
