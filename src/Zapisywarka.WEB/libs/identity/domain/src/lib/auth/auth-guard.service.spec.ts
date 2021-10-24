import { fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { UserService } from '../user-service.service';
import { SessionQuery } from '../session/session.query'

import { AuthGuard } from './auth-guard.service';
import exp = require('constants');

describe('Authguard', () => {
  let spectator: SpectatorService<AuthGuard>;
  const createService = createServiceFactory({
      service: AuthGuard,
      mocks: [UserService, SessionQuery, Router]
  });
  const fakeRoute = {} as ActivatedRouteSnapshot
  const fakeRouterState = {} as RouterStateSnapshot

  beforeEach(() => spectator = createService());

  it('should can activate when user is logged in', fakeAsync(()=> {

    const sessionQuery = spectator.inject<SessionQuery>(SessionQuery) 

    sessionQuery.isLoggedIn.mockReturnValueOnce(of(true))

    spectator.service.canActivate(fakeRoute, fakeRouterState).subscribe(canActivate =>{
     expect(canActivate).toBe(true)
    })   

    tick()  
        
  }))

 
  it('should can not activate when user is not logged in', fakeAsync(()=> {

    const sessionQuery = spectator.inject<SessionQuery>(SessionQuery) 

    sessionQuery.isLoggedIn.mockReturnValueOnce(of(false))
   
    spectator.service.canActivate(fakeRoute, fakeRouterState).subscribe(canActivate =>{
     expect(canActivate).toBe(false)
    })   

    tick()

        
  }))

 
  it('should redirect to main page when user is not logged in', fakeAsync(()=>{

    const sessionQuery = spectator.inject<SessionQuery>(SessionQuery) 
    const router = spectator.inject<Router>(Router)

    sessionQuery.isLoggedIn.mockReturnValueOnce(of(false))
   
    spectator.service.canActivate(fakeRoute, fakeRouterState).subscribe()   

    tick()

    expect(router.navigateByUrl).toBeCalledWith('/')

  }))
 
  
});