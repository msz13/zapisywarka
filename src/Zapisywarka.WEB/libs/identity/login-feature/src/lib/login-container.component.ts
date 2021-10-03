import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@zapisywarka-client-aps/identity/domain';



@Component({
  selector: 'app-login-container',
  template: `
  <app-login-form [invalidCredentialsError]="invalidCredentialsError" (login)="onLogin($event)"></app-login-form>
  `,
  styles: [],
})
export class LoginContainerComponent implements OnInit {
  
  invalidCredentialsError: string | undefined
  
  constructor(private userService: UserService) {}

  onLogin(loginCredentials: any) {
    this.userService.login(loginCredentials).subscribe({error: (err: HttpErrorResponse)=> {
      console.debug(err)
      this.invalidCredentialsError = err.error.message
    }})
  }
   
  ngOnInit(): void {}
   

}