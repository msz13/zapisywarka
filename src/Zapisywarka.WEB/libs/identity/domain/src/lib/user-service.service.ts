import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@zapisywarka-client-aps/shared/domain';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { LoginCredentials } from '..';
import { SessionStore } from './session/session.store';

export interface User {
  accessCode: string,
  userName: string,
  password: string
}

interface LoggedUser {
  id: string,
  userName: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl: string

  private _loading = new BehaviorSubject(false)

  loading()  {
    return this._loading.asObservable()
  }
 

  constructor(private http: HttpClient, private config: ConfigurationService, private sessionStore: SessionStore) { 
    
    this.baseUrl = config.getConfig().apiUrl + '/users'

  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user).pipe(map(()=> true),catchError(this.handleError))
  }

  login(loginCredentials: LoginCredentials) {
    this._loading.next(true)
    return this.http.post(this.baseUrl+'/login', loginCredentials, {})
      .pipe(
        catchError(this.handleError), 
        finalize(()=> this._loading.next(false))
        )
  }

  loadUser(): Observable<LoggedUser> {
    return this.http.get<LoggedUser>(this.baseUrl+'/me').pipe(
      tap(user => {
        this.sessionStore.update(user)
      }),
      catchError((err: HttpErrorResponse) => {
       if (err.status == 401) {
        return EMPTY
       } 
        return throwError(err)
      })
    )
  }


  handleError(error: HttpErrorResponse) {

    if(error.status === 401) {
      return throwError(new Error(error.error.message));
    }

    console.error(error.status + ': ' + error.error)            
    return throwError(new Error('Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie'));
  }
}
