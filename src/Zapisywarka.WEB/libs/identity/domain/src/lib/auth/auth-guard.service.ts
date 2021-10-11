import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SessionQuery } from '../session/session.query';
import { UserService } from '../user-service.service';

export interface User {
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionQuery: SessionQuery, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.sessionQuery.isLoggedIn().pipe(tap(isLoggedIn =>{
      if(!isLoggedIn) {
        this.router.navigateByUrl('/')
      }
      
    }))     
    
     
  }
}
