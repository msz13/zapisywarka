import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
 
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post('api/identity/users', user).pipe(map(()=> true),catchError(this.handleError))
  }


  handleError(error: HttpErrorResponse) {
    console.error(error.status + ': ' + error.error)
            
    return throwError(new Error('Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie'));
  }
}
