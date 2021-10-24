import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials, UserService } from '@zapisywarka-client-aps/identity/domain';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login-container',
  template: `
  <app-login-form 
    [error]="error"
    [loading]="loading$ | async" 
    (login)="onLogin($event)"
  >
  </app-login-form>
  `,
  styles: [],
})
export class LoginContainerComponent implements OnInit {
  
  error: string | undefined

  loading$!: Observable<boolean> 
  
  constructor(private userService: UserService, private router: Router) {
    
  this.loading$ = this.userService.loading()

  }

  onLogin(loginCredentials: LoginCredentials) {
    this.userService.login(loginCredentials).subscribe({
      next: ()=> this.router.navigateByUrl('/main'),      
      error: (err: Error)=> {
        this.error = err.message
    }})
  }
   
  ngOnInit(): void {
    
  }
   

}