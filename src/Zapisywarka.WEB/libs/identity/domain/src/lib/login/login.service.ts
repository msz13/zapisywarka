import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {IFormGroup, RxFormBuilder, RxwebValidators} from '@rxweb/reactive-form-validators'
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { LoginCredentials } from './login-credentials';


export class LoginService {

  constructor(fb: RxFormBuilder, private http: HttpClient) {
    this.createForm(fb);
    this._loading$.next(false)
   }

  private loginForm!: IFormGroup<LoginCredentials>

  getLoginForm() {
    return this.loginForm
  }

  _loading$ = new BehaviorSubject(false)
  get loading$() {
    return this._loading$.asObservable()
  } 


  
   submit() {
     
    if(this.loginForm.valid) { 
      
      this._loading$.next(true)
      this.http.post('/users/login', this.loginForm.value).pipe(catchError(this.handleError)).subscribe()
      this._loading$.next(false)
  }
}


  private handleError(error: HttpErrorResponse) {
    this.loginForm.setErrors({invalidCredentials: {message: error.message}})
    return of('')
  }

  

  private createForm(fb: RxFormBuilder) {
    this.loginForm = <IFormGroup<LoginCredentials>>fb.group({
      userName: ['', RxwebValidators.notEmpty({ message: 'Nazwa użytkownika jest wymagana' })],
      password: ['', RxwebValidators.notEmpty({ message: 'Hasło jest wymagane' })],
      rememberMe: [false]
    });
  }
}
