import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@zapisywarka-client-aps/shared/domain';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  accessCode: string,
  userName: string,
  password: string
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private baseUrl: string

  constructor(private http: HttpClient, config: ConfigurationService) { 
    
    this.baseUrl = config.getConfig().apiUrl + '/users'

  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user).pipe(map(()=> true),catchError(this.handleError))
  }


  handleError(error: HttpErrorResponse) {
    console.error(error.status + ': ' + error.error)
            
    return throwError(new Error('Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie'));
  }
}
