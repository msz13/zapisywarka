import { HttpErrorResponse } from "@angular/common/http";
import { fakeAsync, tick } from "@angular/core/testing";
import { Store } from "@datorama/akita";
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from "@ngneat/spectator/jest";
import { ConfigurationService } from "@zapisywarka-client-aps/shared/domain";
import { SessionQuery } from "./session/session.query";
import { SessionStore } from "./session/session.store";
import { UserService } from "./user-service.service";

describe("Load user", () => {
  let spectator: SpectatorHttp<UserService>;

  const baseUrl = "http://test.pl";
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
   // mocks: [SessionStore]
    
  });

  beforeEach(() => (spectator = createHttp()));

  it("should load user", () => {

    spectator.service.loadUser().subscribe();

    spectator.expectOne(baseUrl + "/users/me", HttpMethod.GET);

  });

  it('should save user to store', ()=>{ 


    const user = {id: '1', userName: 'mat'}
    const query = spectator.inject(SessionQuery)

    spectator.service.loadUser().subscribe()

    const req =  spectator.expectOne(baseUrl + "/users/me", HttpMethod.GET)

    req.flush(user,{status: 200, statusText: 'test'})

    let isLoggedIn: boolean 
    query.isLoggedIn().subscribe(result => isLoggedIn = result)

    expect(isLoggedIn).toBe(true)   


  })

  it('should not save user to store when user is not logged in', () => {

    const query = spectator.inject(SessionQuery)

    spectator.service.loadUser().subscribe()

    const req =  spectator.expectOne(baseUrl + "/users/me", HttpMethod.GET)

    req.flush({status: 401, statusText: 'anauthenticated'})

    let isLoggedIn: boolean 
    query.isLoggedIn().subscribe(result => isLoggedIn = result)

    expect(isLoggedIn).toBe(false) 

  })

  
})  
 
   
   
    

   
 
  

