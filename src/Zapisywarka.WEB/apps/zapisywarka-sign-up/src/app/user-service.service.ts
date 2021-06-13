import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface User {
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
    return this.http.post('api/identity/users', user)
  }
}
